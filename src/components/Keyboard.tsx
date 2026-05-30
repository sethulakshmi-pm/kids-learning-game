import React from "react";

type KeyboardProps = {
    onPress: (key: string) => void;
};

const KEYS = [
    "A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S",
    "T", "U", "V", "W", "X", "Y", "Z",
];

const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#FFD93D",
    "#6BCB77",
    "#4D96FF",
    "#FF9F1C",
    "#C77DFF",
];

function Keyboard({ onPress }: KeyboardProps) {
    return (
        <div style={styles.container}>
            {KEYS.map((key, index) => (
                <button
                    key={key}
                    style={{
                        ...styles.key,
                        backgroundColor: colors[index % colors.length],
                    }}
                    onClick={() => onPress(key)}
                >
                    {key}
                </button>
            ))}
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "10px",
        width: "900px",
        maxWidth: "95%",
        padding: "10px",
    },

    key: {
        width: "60px",
        height: "60px",
        border: "none",
        borderRadius: "12px",
        color: "white",
        fontSize: "24px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        transition: "transform 0.2s ease",
    },
};

export default Keyboard;