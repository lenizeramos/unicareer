import { ICards } from "@/app/Types";


const Card:React.FC<ICards> = ({icon:Icon}) => {
  return (
    <>
      <div className="w-fit bg-white hover:bg-primary">
      {Icon && <Icon className={`text-5xl text-primary hover:text-white`}/>}
      </div>
    </>
  );
};

export default Card;
