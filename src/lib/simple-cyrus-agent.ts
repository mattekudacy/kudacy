export class SimpleCyrusAgent {
  
  private async searchTavily(query: string): Promise<string> {
    if (!process.env.TAVILY_API_KEY) {
      return "Search functionality is not available. Please configure TAVILY_API_KEY.";
    }

    try {
      // Search specifically for Cyrus Mante's LinkedIn profile
      const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: process.env.TAVILY_API_KEY,
          query: `site:linkedin.com/in/cyrusmante OR "Cyrus Mante" LinkedIn ${query}`,
          search_depth: "advanced",
          include_images: false,
          include_answer: true,
          max_results: 5
        })
      });

      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const results = data.results.slice(0, 3).map((result: any) => 
          `**${result.title}**\n${result.content}\nSource: ${result.url}`
        );
        return results.join('\n\n---\n\n');
      } else {
        return "I couldn't find specific information about that topic. You can find Cyrus Mante's complete profile at: https://www.linkedin.com/in/cyrusmante/";
      }
    } catch (error) {
      console.error('Tavily search error:', error);
      return "I encountered an error while searching. You can find Cyrus Mante's LinkedIn profile at: https://www.linkedin.com/in/cyrusmante/";
    }
  }

  private async generateResponse(searchResults: string, userQuery: string): Promise<string> {
    // Use your existing GitHub Models setup for generating responses
    try {
      const response = await fetch('https://models.inference.ai.azure.com/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are Cyrus Mante's professional AI assistant. Help visitors learn about Cyrus's background and experience.

About Cyrus Mante:
- A skilled technology professional with expertise in software development
- Active LinkedIn profile: https://www.linkedin.com/in/cyrusmante/
- Experienced in various technical domains and engineering roles

Guidelines:
- Be helpful and professional
- Always prioritize information from Cyrus's LinkedIn profile
- Reference his LinkedIn profile URL when relevant: https://www.linkedin.com/in/cyrusmante/
- Use the search results to provide accurate, current information
- Keep responses concise but informative
- If you don't have specific information, direct visitors to his LinkedIn profile
- Always maintain a positive and professional tone

Search Results about Cyrus Mante:
${searchResults}

Note: For the most complete and current information about Cyrus Mante's professional background, experience, and qualifications, visitors should check his LinkedIn profile at: https://www.linkedin.com/in/cyrusmante/`
            },
            {
              role: 'user', 
              content: userQuery
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response at the moment.";
    } catch (error) {
      console.error('GitHub Models API error:', error);
      return "I'm having trouble generating a response right now. Please try again later.";
    }
  }

  async query(userQuery: string): Promise<string> {
    try {
      // First search for information about Cyrus Mante
      const searchResults = await this.searchTavily(userQuery);
      
      // Then generate a response based on the search results
      const response = await this.generateResponse(searchResults, userQuery);
      
      return response;
    } catch (error) {
      console.error('Agent query error:', error);
      return "I'm sorry, I encountered an error while processing your question. Please try again.";
    }
  }
}
