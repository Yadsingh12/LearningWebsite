import string
import re
import spacy

# Load spaCy model once
nlp = spacy.load("en_core_web_sm")

# === Contraction dictionary ===
contractions_dict = {
    "don't": "do not", "can't": "cannot", "won't": "will not", "isn't": "is not",
    "aren't": "are not", "weren't": "were not", "hasn't": "has not", "haven't": "have not",
    "hadn't": "had not", "doesn't": "does not", "didn't": "did not", "shouldn't": "should not",
    "wouldn't": "would not", "couldn't": "could not", "mustn't": "must not", "it's": "it is",
    "he's": "he is", "she's": "she is", "you're": "you are", "we're": "we are", "they're": "they are",
    "I've": "I have", "you've": "you have", "we've": "we have", "they've": "they have",
    "I'll": "I will", "you'll": "you will", "he'll": "he will", "she'll": "she will", "it'll": "it will",
    "we'll": "we will", "they'll": "they will", "let's": "let us", "there's": "there is", "here's": "here is",
    "what's": "what is", "that's": "that is", "who's": "who is", "how's": "how is"
}

contractions_re = re.compile(r'\b(' + '|'.join(re.escape(key) for key in contractions_dict.keys()) + r')\b', re.IGNORECASE)

def expand_contractions(sentence):
    def replace(match):
        return contractions_dict[match.group(0).lower()]
    return contractions_re.sub(replace, sentence)

def remove_punctuation(text):
    return text.translate(str.maketrans('', '', string.punctuation))

def make_string(sentence):
    return ' '.join([list(dic.keys())[0] for dic in sentence])

def remove_stopwords(sentence):
    doc = nlp(sentence)
    result = []
    for token in doc:
        if token.pos_ not in {'ADP', 'AUX', 'DET'} and token.text != "to":
            result.append({token.text: token.pos_})
    return result

def replace_with_rootwords(sentence):
    return [{nlp(list(dic.keys())[0])[0].lemma_: list(dic.values())[0]} for dic in sentence]

def reorder(sentence):
    index = -1
    negatives, questions, numbers, others = [], [], [], []
    
    for dic in sentence:
        for word, pos in dic.items():
            if word in {'no', 'not'}:
                negatives.append(dic)
            elif word in {'why', 'what', 'how', 'when', 'where'}:
                questions.append(dic)
            elif pos == 'NUM':
                numbers.append(dic)
            else:
                others.append(dic)

    for i, dic in enumerate(others):
        for value in dic.values():
            if value == 'VERB':
                index = i
                break
        if index != -1: break

    if index == -1:
        return others + numbers + questions + negatives

    subject = reorder(others[:index])
    obj = reorder(others[index + 1:])
    verb = others[index]
    return subject + obj + [verb] + numbers + questions + negatives

def apply_transformations(sentence):
    rules = {
        "sister": [{"female": "ADJ"}, {"sibling": "NOUN"}],
        "brother": [{"male": "ADJ"}, {"sibling": "NOUN"}],
        "daughter": [{"female": "ADJ"}, {"born": "VERB"}],
        "son": [{"male": "ADJ"}, {"born": "VERB"}],
        "husband": [{"male": "ADJ"}, {"marry": "VERB"}],
        "friday": [{"f": "NOUN"}, {"f": "NOUN"}],
        "prime minister": [{"p": "NOUN"}, {"m": "NOUN"}, {"boss": "NOUN"}],
        "chief minister": [{"c": "NOUN"}, {"m": "NOUN"}, {"boss": "NOUN"}],
        "who": [{"face": "NOUN"}, {"question": "NOUN"}],
        "where": [{"place": "NOUN"}, {"question": "NOUN"}],
        "when": [{"time": "NOUN"}, {"question": "NOUN"}],
        "what time": [{"time": "NOUN"}, {"question": "NOUN"}],
        "what day": [{"day": "NOUN"}, {"question": "NOUN"}],
        "april": [{"a": "NOUN"}, {"hot": "ADJ"}],
        "december": [{"d": "NOUN"}, {"cold": "ADJ"}],
        "sunday": [{"s": "NOUN"}, {"closed": "ADJ"}],
        "principal": [{"p": "NOUN"}, {"top": "NOUN"}],
        "training": [{"t": "NOUN"}, {"teach": "VERB"}],
        "library": [{"l": "NOUN"}, {"book": "NOUN"}],
        "minister": [{"m": "NOUN"}, {"boss": "NOUN"}],
    }

    transformed = []
    i = 0
    while i < len(sentence):
        matched = False
        for phrase, replacement in rules.items():
            tokens = phrase.split()
            if i + len(tokens) <= len(sentence) and all(
                list(sentence[i + j].keys())[0].lower() == tokens[j] for j in range(len(tokens))
            ):
                transformed.extend(replacement)
                i += len(tokens)
                matched = True
                break

        if not matched:
            word = list(sentence[i].keys())[0].lower()
            if word in {"every", "multiple", "many"} and i + 1 < len(sentence):
                next_word = sentence[i + 1]
                transformed.append(next_word)
                transformed.append(next_word)
                i += 2
            else:
                transformed.append(sentence[i])
                i += 1
    return transformed

def convert_to_isl(text: str):
    expanded = expand_contractions(text)
    punctuation_free = remove_punctuation(expanded)
    filtered = remove_stopwords(punctuation_free)
    root = replace_with_rootwords(filtered)
    reordered = reorder(root)
    transformed = apply_transformations(reordered)
    
    return make_string(transformed)
