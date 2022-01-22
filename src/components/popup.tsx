import { FunctionComponent } from 'preact'

const Popup: FunctionComponent = (props) => {
  return (
    <div className="popup" style={{ display: 'none',}}>
      <div className="popup_inner">
        <h1>Popup</h1>
        {props.children}
      </div>
    </div>
  )
}

export default Popup
