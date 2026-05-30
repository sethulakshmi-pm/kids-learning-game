import { motion } from "framer-motion";

type BalloonProps = {
    letter: string;
    x: number;
};

function Balloon({ letter, x }: BalloonProps) {
    return (
        <motion.div
            initial={{ y: 700 }}
            animate={{ y: -200 }}
            transition={{
                duration: 8,
                repeat: Infinity,
            }}
            style={{
                position: "absolute",
                left: x,
                width: 80,
                height: 100,
                borderRadius: "50%",
                backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 40,
                color: "white",
                fontWeight: "bold",
            }}
        >
            {letter}
        </motion.div>
    );
}

export default Balloon;