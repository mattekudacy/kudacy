import { NextRequest, NextResponse } from 'next/server';
import { SimpleAgentV2 } from '@/lib/simple-agent-v2';
import crypto from 'crypto';

const agent = new SimpleAgentV2();

// Store question counts by session (in production, use Redis or a database)
// Using a Map for now - NOTE: This will reset on serverless function cold starts
const sessionQuestionCounts = new Map<string, { count: number; timestamp: number }>();

// Clean up old sessions (older than 24 hours)
const cleanupOldSessions = () => {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  
  for (const [key, value] of sessionQuestionCounts.entries()) {
    if (now - value.timestamp > oneDayMs) {
      sessionQuestionCounts.delete(key);
    }
  }
};

// Generate a fingerprint based on IP and User Agent
const generateFingerprint = (req: NextRequest): string => {
  const ip = req.headers.get('x-forwarded-for') || 
             req.headers.get('x-real-ip') || 
             'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  
  // Create a hash of IP + User Agent for privacy
  const hash = crypto.createHash('sha256');
  hash.update(`${ip}-${userAgent}`);
  return hash.digest('hex').substring(0, 16);
};

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId } = await req.json();
    
    if (!message) {
      return NextResponse.json({ 
        error: "Message is required" 
      }, { status: 400 });
    }

    // Clean up old sessions periodically
    if (Math.random() < 0.1) { // 10% chance on each request
      cleanupOldSessions();
    }

    // Use both sessionId (from localStorage) and fingerprint (from IP/UA) for better tracking
    const fingerprint = generateFingerprint(req);
    const primaryKey = sessionId || fingerprint; // Prefer sessionId, fallback to fingerprint
    const secondaryKey = fingerprint; // Always track by fingerprint too
    
    console.log(`Primary key: ${primaryKey}, Secondary key: ${secondaryKey}`);

    // Check question limit using both keys (if either reached limit, deny)
    const primarySession = sessionQuestionCounts.get(primaryKey);
    const secondarySession = sessionQuestionCounts.get(secondaryKey);
    
    const primaryCount = primarySession?.count || 0;
    const secondaryCount = secondarySession?.count || 0;
    const currentCount = Math.max(primaryCount, secondaryCount); // Use the higher count
    
    console.log(`Session ${primaryKey}: Primary count = ${primaryCount}, Secondary count = ${secondaryCount}, Using = ${currentCount}`);
    
    if (currentCount >= 5) {
      return NextResponse.json({ 
        response: "I'm sorry, but you've reached the limit of 5 questions. Thank you for your interest! If you need more information, please email Cyrus directly at cyrus2952@gmail.com",
        questionsRemaining: 0,
        limitReached: true
      });
    }

    // Increment question count for both keys
    const newCount = currentCount + 1;
    const timestamp = Date.now();
    
    sessionQuestionCounts.set(primaryKey, { count: newCount, timestamp });
    sessionQuestionCounts.set(secondaryKey, { count: newCount, timestamp });
    
    console.log(`Session ${primaryKey}: New count = ${newCount}`);
    
    // Get response from the agent
    const response = await agent.query(message);
    
    const questionsRemaining = 5 - newCount;
    
    return NextResponse.json({ 
      response,
      questionsRemaining,
      limitReached: questionsRemaining === 0
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ 
      response: "I'm sorry, I'm having trouble responding right now. Please try again later.",
      error: true
    }, { status: 500 });
  }
}
