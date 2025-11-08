import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Tool, DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import { ResumeKnowledgeBase } from './resume-knowledge';

class LinkedInSearchTool extends Tool {
  name = "linkedin_search";
  description = "Search for Cyrus Mante's LinkedIn profile information using Tavily";

  constructor() {
    super();
  }

  async _call(input: string): Promise<string> {
    try {
      const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: process.env.TAVILY_API_KEY,
          query: `site:linkedin.com/in/cyrusmante OR "Cyrus Mante" LinkedIn ${input}`,
          search_depth: "advanced",
          include_images: false,
          include_answer: true,
          max_results: 3
        })
      });

      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const results = data.results.slice(0, 3).map((result: any) => ({
          title: result.title,
          content: result.content,
          url: result.url
        }));
        return JSON.stringify(results, null, 2);
      } else {
        return "LinkedIn profile: https://www.linkedin.com/in/cyrusmante/";
      }
    } catch (error) {
      console.error('LinkedIn search error:', error);
      return "You can find Cyrus Mante's LinkedIn profile at: https://www.linkedin.com/in/cyrusmante/";
    }
  }
}

class GeneralSearchTool extends Tool {
  name = "general_search";
  description = "Search for general information about Cyrus Mante using Tavily";

  constructor() {
    super();
  }

  async _call(input: string): Promise<string> {
    try {
      const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: process.env.TAVILY_API_KEY,
          query: `Cyrus Mante ${input}`,
          search_depth: "advanced",
          include_images: false,
          include_answer: true,
          max_results: 5
        })
      });

      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const results = data.results.slice(0, 3).map((result: any) => ({
          title: result.title,
          content: result.content,
          url: result.url
        }));
        return JSON.stringify(results, null, 2);
      } else {
        return "No specific results found for that search.";
      }
    } catch (error) {
      console.error('General search error:', error);
      return "I couldn't perform a web search at the moment. Please try again later.";
    }
  }
}

export class CyrusAgent {
  private agent: AgentExecutor | null = null;
  
  constructor() {
    this.initializeAgent();
  }
  
  private async initializeAgent() {
    try {
      // Initialize the LLM with GitHub Models
      const llm = new ChatOpenAI({
        openAIApiKey: process.env.GITHUB_TOKEN!,
        configuration: {
          baseURL: "https://models.inference.ai.azure.com",
        },
        modelName: "gpt-4o-mini",
        temperature: 0.7,
      });

      // Alternatively, set the environment variable for LangChain
      process.env.OPENAI_API_KEY = process.env.GITHUB_TOKEN;

      // Initialize resume knowledge base
      console.log('Initializing resume knowledge base...'); // Debug log
      const resumeKB = new ResumeKnowledgeBase();
      
      // Test that resume KB works
      const testResult = resumeKB.getFullResume();
      console.log('Resume KB test - content length:', testResult.length); // Debug log

      // Create resume search tool with proper schema
      const resumeSearchTool = new DynamicStructuredTool({
        name: "resume_search",
        description: "Search Cyrus Mante's resume and professional background. Use this for ANY question about Cyrus including who he is, his experience, skills, education, projects, or certifications.",
        schema: z.object({
          input: z.string().describe("The search query"),
        }),
        func: async ({ input }) => {
          console.log('=== RESUME SEARCH TOOL CALLED ===');
          console.log('Input:', input);
          
          try {
            // Always return the full resume for now to test
            const result = resumeKB.getFullResume();
            console.log('Returning resume, length:', result.length);
            
            // Return a shorter summary version for the AI to process
            return `Cyrus Mante's Professional Resume:

${result.substring(0, 3000)}...

[Resume continues with more details about projects, certifications, and achievements]`;
          } catch (error) {
            console.error('Resume search tool error:', error);
            const errorMsg = `Error accessing resume: ${error instanceof Error ? error.message : 'Unknown error'}`;
            console.log('Error message:', errorMsg);
            return errorMsg;
          }
        }
      });

      // Test the tool to make sure it works
      console.log('Testing resume search tool...');
      const testToolResult = await resumeSearchTool.invoke({ input: "test" });
      console.log('Tool test result length:', testToolResult.length);
      console.log('Tool test result preview:', testToolResult.substring(0, 100));

      // Set up search tools
      const tools = [
        new LinkedInSearchTool(),
        new GeneralSearchTool(),
        resumeSearchTool,
      ];

      // Create the agent prompt
      const prompt = ChatPromptTemplate.fromMessages([
        ["system", `You are Cyrus Mante's AI assistant. Your job is to help visitors learn about Cyrus's professional background, experience, and achievements.

        About Cyrus Mante:
        - A skilled professional in technology and development with 4-5 years of experience in AI and ML development
        - LinkedIn profile: https://www.linkedin.com/in/cyrusmante/
        - Experienced in various technical domains
        - Active on professional networks like LinkedIn
        
        Available Tools:
        1. linkedin_search: Search for Cyrus's LinkedIn profile information
        2. general_search: Search for general information about Cyrus online
        3. resume_search: Search Cyrus's detailed resume for specific information about experience, skills, education, projects, and certifications
        
        Guidelines:
        - ALWAYS use the resume_search tool first for questions about Cyrus's background, experience, skills, education, or projects
        - Use LinkedIn search for professional networking and career highlights
        - Use general search only when specific information isn't in the resume
        - Be helpful and professional
        - Always reference his LinkedIn profile: https://www.linkedin.com/in/cyrusmante/
        - Always cite your sources when providing specific information
        - Keep responses concise but informative
        - If you can't find specific information, direct them to his LinkedIn profile

        Frequently Asked Questions (FAQs) about Cyrus:
        - Work Preference: He prefers work from home arrangements. Hybrid work is still negotiable.
        - Salary Expectations: His asking salary is around $30-40k per year.
        - Compensation: He is open to discussing benefits and other compensation options.
        - Notice Period: He usually needs around 30 days notice before starting a new position.
        - Experience: He has 4-5 years of experience in AI and ML development.
        - Contact: For more details, check his LinkedIn: https://www.linkedin.com/in/cyrusmante/
        
        Remember: You're representing Cyrus professionally, so maintain a positive and informative tone.`],
        ["human", "{input}"],
        ["placeholder", "{agent_scratchpad}"]
      ]);      // Create the agent
      const agent = await createOpenAIFunctionsAgent({
        llm,
        tools,
        prompt,
      });

      this.agent = new AgentExecutor({
        agent,
        tools,
        verbose: process.env.NODE_ENV === 'development',
        maxIterations: 5,
        returnIntermediateSteps: true,
        handleParsingErrors: true,
        earlyStoppingMethod: "force", // Force the agent to continue even if parsing fails
      });
    } catch (error) {
      console.error('Failed to initialize Cyrus Agent:', error);
    }
  }

  async query(input: string): Promise<string> {
    if (!this.agent) {
      return "I'm sorry, I'm not ready to answer questions yet. Please try again in a moment.";
    }

    try {
      console.log('=== AGENT QUERY START ===');
      console.log('Input:', input);
      
      const result = await this.agent.invoke({ input });
      
      console.log('=== AGENT QUERY RESULT ===');
      console.log('Full result:', JSON.stringify(result, null, 2));
      console.log('Result.output:', result.output);
      console.log('Result.intermediateSteps:', result.intermediateSteps);
      console.log('Result type:', typeof result);
      console.log('Result keys:', Object.keys(result));
      
      // Check if there are intermediate steps with tool outputs
      if (result.intermediateSteps && result.intermediateSteps.length > 0) {
        console.log('=== INTERMEDIATE STEPS ===');
        result.intermediateSteps.forEach((step: any, index: number) => {
          console.log(`Step ${index}:`, JSON.stringify(step, null, 2));
        });
      }
      
      // Handle different response formats
      let response = '';
      
      if (typeof result === 'string') {
        response = result;
      } else if (result.output && result.output.trim()) {
        response = result.output;
      } else if (result.response) {
        response = result.response;
      } else if (result.text) {
        response = result.text;
      } else {
        console.log('Unknown result format or empty output, using default message');
        response = "I couldn't find a good answer to that question.";
      }
      
      console.log('=== FINAL RESPONSE ===');
      console.log('Response:', response);
      console.log('Response length:', response.length);
      
      return response || "I couldn't find a good answer to that question.";
    } catch (error) {
      console.error('Agent query error:', error);
      return "I'm sorry, I encountered an error while searching for that information. Please try asking something else.";
    }
  }
}
