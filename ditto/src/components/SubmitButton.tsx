import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const SubmitButton = () => {
  
  return (
    <button>
      <FontAwesomeIcon
        icon={faPaperPlane}
        className="text-lg text-accent cursor-pointer"
      />
    </button>
  )
}