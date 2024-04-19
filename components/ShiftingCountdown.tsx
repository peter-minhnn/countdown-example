import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { TimerIcon, TimerReset, PlusIcon } from 'lucide-react';

const ShiftingCountdown = () => {
    let [count, setCount] = useState<any>(null);
    const [seconds, setSeconds] = useState<number>(30);
    const [disabledExtension, setDisabledExtension] = useState<boolean>(false);

    useEffect(() => {
        count = setInterval(handleCountdown, 1000) as any;
        return () => clearInterval(count);
    }, [count]);

    const handleCountdown = () => {
        if (!count) return;
        setSeconds((prev) => {
            let remaining = prev - 1;
            if (remaining <= 0) {
                resetCountdown();
                setDisabledExtension(true);
                return 0;
            }
            return remaining;
        });
    };

    const startCountdown = () => {
        count = setInterval(handleCountdown, 1000) as any;
        setSeconds(30);
        setDisabledExtension(false);
    };

    const resetCountdown = () => {
        clearInterval(count);
        setCount(null);
        setSeconds(0);
        setDisabledExtension(false);
    };

    const extension = () => {
        setDisabledExtension(true);
        setSeconds(prev => {
            return prev + 15;
        });
    }

    return (
        <div className="bg-gradient-to-br w-full flex flex-col items-center">
            <div className="w-full mx-auto flex flex-col gap-5 items-center justify-center bg-white min-h-screen">
                <CountdownItem num={seconds} text="seconds" />
                <div className='flex flex-rows justify-between gap-2'>
                    <Button onClick={startCountdown} className="bg-green-800 w-[8rem] h-10 uppercase font-bold text-1xl">
                        <TimerIcon className="mr-2 h-4 w-4" /> Start
                    </Button>
                    <Button onClick={resetCountdown} variant={'destructive'} className="w-[8rem] uppercase font-bold text-1xl">
                        <TimerReset className="mr-2 h-4 w-4" />Reset
                    </Button>
                    <Button onClick={extension} disabled={disabledExtension} variant={'default'} className="w-[8rem] uppercase text-1xl font-bold">
                        <PlusIcon className="mr-2 h-6 w-6" /> 15s
                    </Button>
                </div>
            </div>
        </div>
    );
};

const CountdownItem = ({ num, text }: { num: number, text: string }) => {
    return (
        <div className="font-mono flex flex-col gap-1 md:gap-2 items-center justify-center w-full">
            <div className="w-full text-center relative overflow-hidden">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={num}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ ease: "backIn", duration: 0.75 }}
                        className="block text-[20rem] md:text-4xl lg:text-6xl xl:text-7xl text-black font-medium"
                    >
                        {num}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ShiftingCountdown;