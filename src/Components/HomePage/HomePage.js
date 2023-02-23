import videohomepge from '../../assets/video-homepage.mp4'
import "./HomePage.scss"
const HomePage = () => {
    return (
        <div className='homepage-container'>

            <div className='content'>
                <div>
                    <h1>There's a better way to ask</h1>
                    <p>You don't want to make a boring form. And your audience won't answer one. Create a typeform instead and make everyone happy.</p>
                    <button className='btn-signup'>Get started - it's free</button>
                </div>

                <div>


                </div>
            </div>

            <div className='videoDiv'>
                <video autoPlay muted loop  >
                    <source src={videohomepge} type="video/mp4" />
                </video>
            </div>
        </div>
    )
}
export default HomePage