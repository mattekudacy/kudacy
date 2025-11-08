import { ChatOpenAI } from "@langchain/openai";
import { ResumeKnowledgeBase } from './resume-knowledge';

export class SimpleAgentV2 {
  private llm: ChatOpenAI;
  private resumeKB: ResumeKnowledgeBase;

  constructor() {
    // Set OPENAI_API_KEY for LangChain
    process.env.OPENAI_API_KEY = process.env.GITHUB_TOKEN;
    
    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.GITHUB_TOKEN!,
      configuration: {
        baseURL: "https://models.inference.ai.azure.com",
      },
      modelName: "gpt-4o-mini",
      temperature: 0.7,
    });
    
    this.resumeKB = new ResumeKnowledgeBase();
    console.log('SimpleAgentV2 initialized');
  }

  async query(input: string): Promise<string> {
    try {
      console.log('=== SimpleAgentV2 QUERY START ===');
      console.log('Input:', input);
      
      // Get resume content
      const resumeContent = this.resumeKB.getFullResume();
      console.log('Resume loaded, length:', resumeContent.length);
      
      // Create a prompt that includes the resume
      const prompt = `You are Cyrus Mante's AI assistant. You have access to his complete resume below.

CYRUS MANTE'S RESUME:
${resumeContent}

FREQUENTLY ASKED QUESTIONS:
- Work Preference: He prefers work from home arrangements. Hybrid work is still negotiable.
- Salary Expectations: His asking salary is around $30-40k per year.
- Compensation: He is open to discussing benefits and other compensation options.
- Notice Period: He usually needs around 30 days notice before starting a new position.
- Experience: He has 4-5 years of experience in AI and ML development.
- Contact: For more details, check his LinkedIn: https://www.linkedin.com/in/cyrusmante/

USER QUESTION: ${input}

Please provide a helpful, professional answer based on the resume above. Keep your response concise but informative. Always maintain a positive and professional tone.`;

      console.log('Calling LLM...');
      const response = await this.llm.invoke(prompt);
      
      console.log('LLM response type:', typeof response);
      console.log('Response content:', response.content);
      
      const answer = typeof response.content === 'string' 
        ? response.content 
        : JSON.stringify(response.content);
      
      console.log('=== SimpleAgentV2 QUERY END ===');
      console.log('Final answer length:', answer.length);
      
      return answer;
    } catch (error) {
      console.error('SimpleAgentV2 query error:', error);
      return "I'm sorry, I encountered an error while searching for that information. Please try asking something else.";
    }
  }
}
