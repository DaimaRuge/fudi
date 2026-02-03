/**
 * AI Service - Handles AI model interactions
 * Supports OpenAI and ZhipuAI models
 */

import { ChatCompletionRequestMessage, OpenAI } from 'openai';
import { logger } from '../utils/logger';

// Initialize AI clients
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/**
 * Generate AI chat completion
 * @param messages - Array of chat messages
 * @param model - AI model to use (gpt-4, gpt-3.5-turbo, glm-4)
 * @param options - Additional options (temperature, max_tokens, etc.)
 */
export async function generateChatCompletion(
  messages: ChatCompletionRequestMessage[],
  model: string = 'gpt-3.5-turbo',
  options: {
    temperature?: number;
    max_tokens?: number;
    stream?: boolean;
  } = {}
) {
  try {
    logger.info('Generating chat completion', { model, messagesCount: messages.length });

    let response;

    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }

    response = await openai.chat.completions.create({
      model,
      messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.max_tokens || 2000,
      stream: options.stream || false
    });

    return {
      success: true,
      data: {
        id: response.id,
        model: response.model,
        message: response.choices[0].message,
        usage: response.usage
      },
      timestamp: new Date().toISOString()
    };
  } catch (error: any) {
    logger.error('AI chat completion failed', {
      error: error.message,
      model
    });

    return {
      success: false,
      error: {
        code: 'AI_ERROR',
        message: error.message || 'Failed to generate AI response'
      },
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Stream AI chat completion (for real-time responses)
 * @param messages - Array of chat messages
 * @param model - AI model to use
 * @param callback - Callback for each stream chunk
 */
export async function streamChatCompletion(
  messages: ChatCompletionRequestMessage[],
  model: string = 'gpt-3.5-turbo',
  callback: (chunk: string) => void
) {
  try {
    logger.info('Starting stream chat completion', { model });

    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }

    const stream = await openai.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      stream: true
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        callback(content);
      }
    }

    return { success: true };
  } catch (error: any) {
    logger.error('Stream chat completion failed', {
      error: error.message,
      model
    });

    return {
      success: false,
      error: {
        code: 'STREAM_ERROR',
        message: error.message || 'Failed to stream AI response'
      }
    };
  }
}

/**
 * Generate embeddings for semantic search
 * @param texts - Array of texts to embed
 * @param model - Embedding model to use
 */
export async function generateEmbeddings(
  texts: string[],
  model: string = 'text-embedding-ada-002'
) {
  try {
    logger.info('Generating embeddings', { textsCount: texts.length, model });

    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await openai.embeddings.create({
      model,
      input: texts
    });

    return {
      success: true,
      data: response.data,
      model: response.model,
      usage: response.usage
    };
  } catch (error: any) {
    logger.error('Embedding generation failed', {
      error: error.message
    });

    return {
      success: false,
      error: {
        code: 'EMBEDDING_ERROR',
        message: error.message || 'Failed to generate embeddings'
      }
    };
  }
}

/**
 * Get available AI models
 */
export function getAvailableModels() {
  const models = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'openai',
      capabilities: ['chat', 'completion', 'embedding'],
      pricing: 'premium'
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'openai',
      capabilities: ['chat', 'completion'],
      pricing: 'standard'
    }
  ];

  if (process.env.ZHIPU_API_KEY) {
    models.push({
      id: 'glm-4',
      name: 'GLM-4',
      provider: 'zhipu',
      capabilities: ['chat', 'completion'],
      pricing: 'standard'
    });
  }

  return {
    success: true,
    data: models
  };
}

/**
 * Handle AI feedback for fine-tuning
 * @param conversationId - ID of the conversation
 * @param feedback - User feedback (positive/negative)
 * @param message - Feedback message
 */
export async function submitFeedback(
  conversationId: string,
  feedback: 'positive' | 'negative',
  message?: string
) {
  try {
    logger.info('Submitting AI feedback', { conversationId, feedback });

    // Store feedback in database for analysis
    // TODO: Implement feedback storage in database

    return {
      success: true,
      message: 'Feedback submitted successfully'
    };
  } catch (error: any) {
    logger.error('Feedback submission failed', {
      error: error.message
    });

    return {
      success: false,
      error: {
        code: 'FEEDBACK_ERROR',
        message: error.message || 'Failed to submit feedback'
      }
    };
  }
}
