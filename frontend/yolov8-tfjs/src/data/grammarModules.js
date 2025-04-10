export const grammarModules = {
    simplePresent: {
      id: "simplePresent",
      name: "Simple Present",
      rule: "Subject + Object + Verb",
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
    }
    // Add more modules here later
};
  