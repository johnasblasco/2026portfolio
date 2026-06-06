import { Dispatch, SetStateAction, useState } from "react";
import { motion } from "motion/react";

type VoteOption = {
    title: string;
    votes: number;
    color: string;
};

const initialVotes: VoteOption[] = [
    {
        title: "Looks Good!",
        votes: 1,
        color: "bg-indigo-500",
    },
    {
        title: "hmm, Decent.",
        votes: 2,
        color: "bg-fuchsia-500",
    },
    {
        title: "Who cares bro?",
        votes: 3,
        color: "bg-violet-500",
    },
];

const BarPoll = () => {
    const [votes, setVotes] = useState<VoteOption[]>(initialVotes);

    return (
        <section className="bg-slate-900 px-4 py-12">
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-2 md:grid-cols-[1fr_400px] md:gap-12">
                <Options votes={votes} setVotes={setVotes} />
                <Bars votes={votes} />
            </div>
        </section>
    );
};

type OptionsProps = {
    votes: VoteOption[];
    setVotes: Dispatch<SetStateAction<VoteOption[]>>;
};

const Options = ({ votes, setVotes }: OptionsProps) => {
    const totalVotes = votes.reduce((acc, vote) => acc + vote.votes, 0);

    const handleIncrementVote = (vote: VoteOption) => {
        setVotes((prevVotes) =>
            prevVotes.map((item) =>
                item.title === vote.title
                    ? { ...item, votes: item.votes + 1 }
                    : item
            )
        );
    };

    const handleResetVotes = () => {
        setVotes((prevVotes) =>
            prevVotes.map((vote) => ({
                ...vote,
                votes: 0,
            }))
        );
    };

    return (
        <div className="col-span-1 py-12">
            <h3 className="mb-6 text-3xl font-semibold text-slate-50">
                What's your opinion?
            </h3>

            <div className="mb-6 space-y-2">
                {votes.map((vote) => (
                    <motion.button
                        key={vote.title}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        onClick={() => handleIncrementVote(vote)}
                        className={`w-full rounded-md ${vote.color} py-2 font-medium text-white`}
                    >
                        {vote.title}
                    </motion.button>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <span className="mb-2 italic text-slate-400">
                    {totalVotes} votes
                </span>

                <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={handleResetVotes}
                    className="rounded-sm bg-slate-700 px-2 py-1.5 text-sm font-medium text-slate-200"
                >
                    Reset count
                </motion.button>
            </div>
        </div>
    );
};

type BarsProps = {
    votes: VoteOption[];
};

const Bars = ({ votes }: BarsProps) => {
    const totalVotes = votes.reduce((acc, vote) => acc + vote.votes, 0);

    return (
        <div
            className="col-span-1 grid min-h-[200px] gap-2"
            style={{
                gridTemplateColumns: `repeat(${votes.length}, minmax(0, 1fr))`,
            }}
        >
            {votes.map((vote) => {
                const height =
                    totalVotes > 0 && vote.votes > 0
                        ? ((vote.votes / totalVotes) * 100).toFixed(2)
                        : "0";

                return (
                    <div key={vote.title} className="col-span-1">
                        <div className="relative flex h-full w-full items-end overflow-hidden rounded-2xl bg-gradient-to-b from-slate-700 to-slate-800">
                            <motion.span
                                animate={{ height: `${height}%` }}
                                className={`relative z-0 w-full ${vote.color}`}
                                transition={{ type: "spring" }}
                            />

                            <span className="absolute bottom-0 left-1/2 mt-2 inline-block w-full -translate-x-1/2 p-2 text-center text-sm text-slate-50">
                                <b>{vote.title}</b>
                                <br />
                                <span className="text-xs text-slate-200">
                                    {vote.votes} votes
                                </span>
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BarPoll;