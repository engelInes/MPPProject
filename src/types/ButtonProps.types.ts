export type ButtonProps = {
    type: 'button' | 'submit' | 'reset' | undefined;
    className?: string;
    onClick?: () => void;
    buttonMessage: string;
    data_test_id?:string;
};
