import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Titles from '../Components/Titles'
import Concerts from '../Components/Concerts'
import Button from '../Components/Button'

export default function Home() {
    return (
        <div>
            <Navbar band="Arctic Monkeys"/>
            <Hero />
            <Titles />
            <Concerts /> 
            <Button />
            
        </div>
    )
}

