import {Navigate, Route, Routes} from "react-router";
import {GameScreen} from "./components/Screen/GameScreen.tsx";
import LevelProviderFromURL from "./context/LevelProviderFromURL.tsx";
import {LevelsScreen} from "./components/Screen/LevelsScreen.tsx";
import {IntroScreen} from "./components/Screen/IntroScreen.tsx";
import {WinScreen} from "./components/Screen/WinScreen.tsx";
import {OutroScreen} from "./components/Screen/OutroScreen.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/intro"/>}/>
                <Route path="/intro" element={<IntroScreen/>}/>
                <Route path="/levels" element={<LevelsScreen/>}/>
                <Route path="/levels/:number" element={
                    <LevelProviderFromURL>
                        <GameScreen/>
                    </LevelProviderFromURL>
                }/>
                <Route path="/outro" element={<OutroScreen/>}/>
                <Route path="/win" element={<WinScreen/>}/>
            </Routes>
        </>
    )
}

export default App;
