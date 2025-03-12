import { IBadge } from "../Types";

export default function Badge({ status, color }: IBadge) {
    return (
        <div className={`border-${color} border-2 text-${color}Color p-2 rounded-full`}>
            {status}
        </div>
    );
}