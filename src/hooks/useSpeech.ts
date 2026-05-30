export const speak = (
    text: string,
    options?: {
        rate?: number;
        pitch?: number;
        volume?: number;
    }
) => {
    if (!("speechSynthesis" in window)) {
        console.warn("Speech Synthesis is not supported in this browser.");
        return;
    }

    // Stop any currently playing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = options?.rate ?? 0.8;
    utterance.pitch = options?.pitch ?? 1.2;
    utterance.volume = options?.volume ?? 1;

    // Try to use an English voice if available
    const voices = window.speechSynthesis.getVoices();

    const preferredVoice =
        voices.find((voice) => voice.lang.startsWith("en")) ??
        voices[0];

    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
};

export const speakLetter = (letter: string) => {
    speak(letter.toUpperCase(), {
        rate: 0.7,
        pitch: 1.3,
    });
};

export const speakNumber = (number: string) => {
    speak(number, {
        rate: 0.7,
        pitch: 1.1,
    });
};