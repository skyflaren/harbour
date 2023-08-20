import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const SubmitButton = () => {
  
  return (
    <button className="input-button">
      <FontAwesomeIcon
        icon={faPaperPlane}
        className="text-gray-500 ml-2 cursor-pointer"
      />
    </button>
  )
}