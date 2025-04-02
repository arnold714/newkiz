import SyncLoader from "react-spinners/SyncLoader"

export const LoadingComponent = () => {

    return(
        <div className="top-0 left-0 fixed w-full h-full flex justify-center items-center z-999">
            <SyncLoader size={20} color={"#BFD46F"} margin={5}/>
        </div>
    )
}
