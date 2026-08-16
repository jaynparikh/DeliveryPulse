import { useRef, useState } from 'react';
import { router } from 'expo-router';

import {
  ActivityIndicator,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';

import {
  colors,
  radius,
  spacing,
} from '../theme';

import BottomNav from '../components/BottomNav';

import {
  askCopilot,
} from '../services/api';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
};

const suggestedQuestions = [
  'Which projects need attention?',
  'What are my highest delivery risks?',
  'Who is busy right now?',
  'Give me a portfolio summary',
];

export default function CopilotScreen() {
  const [question, setQuestion] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState<Message[]>([
      {
        id: 1,
        role: 'assistant',
        text:
          'Hi Jay. I’m your DeliveryPulse Copilot. Ask me about project health, risks, capacity or portfolio performance.',
      },
    ]);

  const scrollViewRef =
    useRef<ScrollView>(null);

  const scrollToConversation = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({
        animated: true,
      });
    }, 150);
  };

  const askQuestion = async (
    value?: string
  ) => {
    const text =
      (value ?? question).trim();

    if (!text || loading) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      text,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setQuestion('');
    setLoading(true);

    scrollToConversation();

    try {
      const answer =
        await askCopilot(text);

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        text: answer,
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to generate Copilot response.';

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text:
            `I couldn't generate the delivery insight right now.\n\n${message}`,
        },
      ]);
    } finally {
      setLoading(false);
      scrollToConversation();
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (
      event.nativeEvent.key === 'Enter'
    ) {
      event.preventDefault();

      if (!loading) {
        askQuestion();
      }
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.eyebrow}>
              AI DELIVERY ASSISTANT
            </Text>

            <Text style={styles.title}>
              Copilot
            </Text>

            <Text style={styles.subtitle}>
              Turn delivery data into
              actionable decisions
            </Text>
          </View>

          <Pressable
            style={styles.avatar}
            onPress={() =>
              router.replace('/login')
            }
          >
            <Text style={styles.avatarText}>
              JP
            </Text>
          </Pressable>
        </View>

        <View style={styles.aiBanner}>
          <View style={styles.aiIcon}>
            <Text style={styles.aiIconText}>
              ✦
            </Text>
          </View>

          <View
            style={styles.aiBannerContent}
          >
            <Text
              style={styles.aiBannerTitle}
            >
              Delivery intelligence
            </Text>

            <Text
              style={styles.aiBannerText}
            >
              Ask questions about your
              portfolio and get
              decision-focused insights.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Suggested Questions
        </Text>

        <View style={styles.suggestions}>
          {suggestedQuestions.map(
            (item) => (
              <Pressable
                key={item}
                style={({ pressed }) => [
                  styles.suggestion,
                  pressed &&
                    styles.suggestionPressed,
                  loading &&
                    styles.suggestionDisabled,
                ]}
                onPress={() =>
                  askQuestion(item)
                }
                disabled={loading}
              >
                <Text
                  style={
                    styles.suggestionText
                  }
                >
                  {item}
                </Text>

                <Text
                  style={
                    styles.suggestionArrow
                  }
                >
                  ›
                </Text>
              </Pressable>
            )
          )}
        </View>

        <Text style={styles.sectionTitle}>
          Conversation
        </Text>

        <View style={styles.conversation}>
          {messages.map((message) => {
            const isUser =
              message.role === 'user';

            return (
              <View
                key={message.id}
                style={[
                  styles.messageRow,
                  isUser &&
                    styles.userMessageRow,
                ]}
              >
                {!isUser && (
                  <View
                    style={
                      styles.messageIcon
                    }
                  >
                    <Text
                      style={
                        styles.messageIconText
                      }
                    >
                      ✦
                    </Text>
                  </View>
                )}

                <View
                  style={[
                    styles.messageBubble,
                    isUser
                      ? styles.userBubble
                      : styles.assistantBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      isUser &&
                        styles.userMessageText,
                    ]}
                  >
                    {message.text}
                  </Text>
                </View>
              </View>
            );
          })}

          {loading && (
            <View style={styles.messageRow}>
              <View
                style={styles.messageIcon}
              >
                <Text
                  style={
                    styles.messageIconText
                  }
                >
                  ✦
                </Text>
              </View>

              <View
                style={[
                  styles.messageBubble,
                  styles.assistantBubble,
                  styles.loadingBubble,
                ]}
              >
                <ActivityIndicator
                  size="small"
                  color={colors.primary}
                />

                <Text
                  style={styles.thinkingText}
                >
                  Analyzing delivery data...
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.inputSection}>
          <TextInput
            value={question}
            onChangeText={setQuestion}
            placeholder={
              loading
                ? 'Copilot is analyzing...'
                : 'Ask about your delivery portfolio...'
            }
            placeholderTextColor={
              colors.textSecondary
            }
            multiline={false}
            returnKeyType="send"
            onKeyPress={handleKeyPress}
            onSubmitEditing={() => {
              if (!loading) {
                askQuestion();
              }
            }}
            style={styles.input}
            editable={!loading}
          />

          <Pressable
            style={[
              styles.sendButton,
              (!question.trim() ||
                loading) &&
                styles.sendButtonDisabled,
            ]}
            onPress={() =>
              askQuestion()
            }
            disabled={
              !question.trim() ||
              loading
            }
          >
            <Text
              style={
                styles.sendButtonText
              }
            >
              ↑
            </Text>
          </Pressable>
        </View>

        <Text style={styles.enterHint}>
          Press Enter to send
        </Text>

        <Text style={styles.disclaimer}>
          Copilot analyzes the delivery
          information currently available
          in DeliveryPulse. AI-generated
          recommendations should be
          reviewed before action.
        </Text>

        <View style={styles.bottomSpace} />
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor:
      colors.background,
  },

  container: {
    flex: 1,
  },

  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },

  headerContent: {
    flex: 1,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1,
    marginBottom: 5,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.text,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor:
      colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 14,
  },

  aiBanner: {
    backgroundColor:
      colors.primaryDark,
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  aiIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF22',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  aiIconText: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '800',
  },

  aiBannerContent: {
    flex: 1,
  },

  aiBannerTitle: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },

  aiBannerText: {
    color: '#DBEAFE',
    fontSize: 12,
    lineHeight: 18,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '700',
    marginBottom: spacing.md,
  },

  suggestions: {
    marginBottom: spacing.xl,
  },

  suggestion: {
    backgroundColor:
      colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  suggestionPressed: {
    opacity: 0.75,
  },

  suggestionDisabled: {
    opacity: 0.55,
  },

  suggestionText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },

  suggestionArrow: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
    marginLeft: spacing.md,
  },

  conversation: {
    marginBottom: spacing.lg,
  },

  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },

  userMessageRow: {
    justifyContent: 'flex-end',
  },

  messageIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    marginTop: 2,
  },

  messageIconText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },

  messageBubble: {
    maxWidth: '82%',
    borderRadius: radius.lg,
    padding: spacing.md,
  },

  assistantBubble: {
    backgroundColor:
      colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  userBubble: {
    backgroundColor:
      colors.primary,
  },

  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  thinkingText: {
    color:
      colors.textSecondary,
    fontSize: 12,
    marginLeft: spacing.sm,
  },

  messageText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 20,
  },

  userMessageText: {
    color: colors.surface,
  },

  inputSection: {
    backgroundColor:
      colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    height: 44,
    color: colors.text,
    fontSize: 13,
    paddingHorizontal: spacing.sm,
  },

  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor:
      colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sendButtonDisabled: {
    opacity: 0.35,
  },

  sendButtonText: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '800',
  },

  enterHint: {
    color:
      colors.textSecondary,
    fontSize: 9,
    textAlign: 'right',
    marginTop: 4,
  },

  disclaimer: {
    color:
      colors.textSecondary,
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },

  bottomSpace: {
    height: 30,
  },
});