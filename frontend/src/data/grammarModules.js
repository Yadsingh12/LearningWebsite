export const grammarModules = {
  simplePresent: {
    id: "simplePresent",
    name: "Simple Present",
    rule: "Subject + Object + Verb",
    explanation:
      "In simple present sentences with objects, the verb comes at the end in ISL. " +
      "We first mention the subject, then the object, and finally the action (verb). " +
      "Also, in ISL, verbs do not change based on the subject (no 's' or 'es').",
    example: {
      english: "I eat apples",
      isl: "I apple eat"
    },
    practiceSentences: [
      { english: "She drinks water", isl: "She water drink" },
      { english: "They play football", isl: "They football play" },
      { english: "He reads books", isl: "He book read" },
      { english: "We watch movies", isl: "We movie watch" },
      { english: "You eat rice", isl: "You rice eat" }
    ]
  },

  whQuestions: {
    id: "whQuestions",
    name: "WH Questions",
    rule: "WH-word at the end (e.g., where, what)",
    explanation:
      "In WH questions (what, where, who, etc.), ISL places the question word at the end. " +
      "Start with the subject and verb first, then add the WH word.",
    example: {
      english: "Where are you going?",
      isl: "You go where"
    },
    practiceSentences: [
      { english: "What is your name?", isl: "Your name what" },
      { english: "Where do you live?", isl: "You live where" },
      { english: "Who is that boy?", isl: "That boy who" },
      { english: "Why are you late?", isl: "You late why" },
      { english: "When will we meet?", isl: "We meet when" }
    ]
  },

  sVSentences: {
    id: "sVSentences",
    name: "Subject + Verb",
    rule: "Subject followed by Verb (in ISL, keep base form of verb even for he/she/it)",
    explanation:
      "For simple sentences without an object, use subject + verb. " +
      "In ISL, always use the base form of the verb, even if English uses 's' or 'es' (like 'runs' becomes 'run').",
    example: {
      english: "She runs",
      isl: "She run"
    },
    practiceSentences: [
      { english: "He sleeps", isl: "He sleep" },
      { english: "I write", isl: "I write" },
      { english: "They dance", isl: "They dance" },
      { english: "We cook", isl: "We cook" },
      { english: "It barks", isl: "It bark" }
    ]
  },

  sVOSentences: {
    id: "sVOSentences",
    name: "Subject + Verb + Object",
    rule: "Subject + Object + Verb (ISL order)",
    explanation:
      "In English, the usual order is Subject + Verb + Object. In ISL, we change the order to Subject + Object + Verb. " +
      "Also, ISL keeps the verb in base form (no 's', 'es', or 'ing').",
    example: {
      english: "She eats rice",
      isl: "She rice eat"
    },
    practiceSentences: [
      { english: "You play guitar", isl: "You guitar play" },
      { english: "They watch TV", isl: "They TV watch" },
      { english: "She eats rice", isl: "She rice eat" },
      { english: "We read books", isl: "We book read" },
      { english: "He writes letters", isl: "He letter write" }
    ]
  },

  negativeSimple: {
    id: "negativeSimple",
    name: "Negative Simple Sentences",
    rule: "Place 'not' at the end",
    explanation:
      "In English, we use 'do not' or 'does not' before the verb. In ISL, just say the sentence in normal order, " +
      "but add 'not' at the end. Also, keep verbs in base form (remove 's').",
    example: {
      english: "He does not eat apple",
      isl: "He apple eat not"
    },
    practiceSentences: [
      { english: "I do not sleep", isl: "I sleep not" },
      { english: "We do not run", isl: "We run not" },
      { english: "He does not eat apple", isl: "He apple eat not" },
      { english: "They do not watch TV", isl: "They TV watch not" },
      { english: "She does not like milk", isl: "She milk like not" }
    ]
  },

  descriptiveSentences: {
    id: "descriptiveSentences",
    name: "Descriptive Sentences",
    rule: "Subject + be (am/is/are) + adjective → ISL: Subject + adjective",
    explanation:
      `"be" means words like "am", "is", or "are" depending on the subject. ` +
      `In ISL, we remove "am/is/are" and directly show the subject with the adjective. ` +
      `For example, "I am tired" becomes "I tired", and "He is happy" becomes "He happy".`,
    example: {
      english: "He is happy",
      isl: "He happy"
    },
    practiceSentences: [
      { english: "I am tired", isl: "I tired" },
      { english: "She is angry", isl: "She angry" },
      { english: "They are hungry", isl: "They hungry" },
      { english: "We are ready", isl: "We ready" },
      { english: "You are late", isl: "You late" }
    ]
  },

  imperativeSentences: {
    id: "imperativeSentences",
    name: "Imperative Sentences",
    rule: "Command form — just the verb or verb + object → ISL: Same structure, sometimes gesture emphasized",
    explanation:
      "Imperative sentences are used to give commands or instructions. In both English and ISL, we use just the verb or verb + object. " +
      "In ISL, gestures and facial expressions may also show the command clearly.",
    example: {
      english: "Sit down",
      isl: "Sit"
    },
    practiceSentences: [
      { english: "Stand up", isl: "Stand" },
      { english: "Write your name", isl: "Your name write" },
      { english: "Come here", isl: "Here come" },
      { english: "Close the door", isl: "Door close" },
      { english: "Eat food", isl: "Food eat" }
    ]
  },

  pastSimple: {
    id: "pastSimple",
    name: "Past Simple",
    rule: "Subject + Object + Verb (past form in English) → ISL: Subject + Object + Verb + done",
    explanation:
      `In English, past tense changes the verb (e.g., "ate", "went"). In ISL, we keep the verb in base form and add the sign "done" at the end to show the action is complete. ` +
      `For example, "I ate apple" becomes "I apple eat done". You can also add time indicators like "yesterday" for clarity.`,
    example: {
      english: "I ate apple",
      isl: "I apple eat done"
    },
    practiceSentences: [
      { english: "She went to school", isl: "She school go done" },
      { english: "They watched a movie", isl: "They movie watch done" },
      { english: "We cooked food", isl: "We food cook done" },
      { english: "He read a book", isl: "He book read done" },
      { english: "I wrote a letter", isl: "I letter write done" }
    ]
  }
  
  
};
