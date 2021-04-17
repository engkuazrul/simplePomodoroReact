import { Component } from "react";
import Timer from '../components/Timer';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faFastForward, faRedo } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
    constructor() {
        super()
        this.state = {
            startTimer: undefined,
            breakTimer: undefined,
            section: 'Work',
            works: { time_min: 25, time_sec: 0, min_text: '25', sec_text: '00' },
            breaks: { time_min: 5, time_sec: 0, min_text: '05', sec_text: '00' },
        }
    }

    start = (event) => {
        let {section, startTimer, breakTimer} = this.state;

        event.preventDefault();
        if (section === 'Work') {
            if (startTimer === undefined) {
                this.setState({startTimer: setInterval(this.pomodoTimer, 1000)});
            } else {
                alert('Already Running');
            }
        } else {
            if (breakTimer === undefined) {
                this.setState({breakTimer: setInterval(this.pomodoBreak, 1000)});
            } else {
                alert('Already Running');
            }
        }
    }

    stop = (event) => {
        event.preventDefault();

        this.stopInterval();
    
        this.setState({startTimer: undefined, breakTimer : undefined});
    }

    reset = (event) => {
        if(event){
            event.preventDefault();
        }

        let works = { ...this.state.works };
        let breaks = { ...this.state.breaks };

        works.time_min = 25;
        works.time_sec = 0;
        works.min_text = '25';
        works.sec_text = '00';
    
        breaks.time_min = 5;
        breaks.time_sec = 0;
        breaks.min_text = '05';
        breaks.sec_text = '00';
    
        this.stopInterval();
        
        this.setState({works, breaks, startTimer: undefined, breakTimer: undefined});
    }

    next = (event) => {
        event.preventDefault();

        
        this.reset();

        let {section} = this.state;
    
        if(section === 'Work'){
            
            this.reset();
    
            this.setState({section: 'Break'});
            
        } else if (section === 'Break'){
    
            this.reset();
    
            this.setState({section: 'Work'});

        }
    }

    pomodoTimer = () =>{
        let {time_min, time_sec} = this.state.works;
        let works = { ...this.state.works };

        if (time_sec !== 0) {
            works.time_sec = time_sec - 1;
            works.sec_text = String(time_sec).padStart(2, '0');

            this.setState({works});
        } else if (time_min !== 0 && time_sec === 0) {
            works.time_sec = 59;
            works.sec_text = String(59).padStart(2, '0');
            works.time_min = time_min - 1;
            works.min_text = String(time_min).padStart(2, '0');

            this.setState({works});
        } else if (time_min === 0 && time_sec === 0) {
            this.setState({section : 'Break'});
            this.stopInterval();
        }

    }

    pomodoBreak = () => {
        let {time_min, time_sec} = this.state.breaks;
        let breaks = { ...this.state.breaks };
    
        if (time_sec !== 0) {
            breaks.time_sec = time_sec - 1;
            breaks.sec_text = String(time_sec).padStart(2, '0');

            this.setState({breaks});
        } else if (time_min !== 0 && time_sec === 0) {
            breaks.time_sec = 59;
            breaks.sec_text = String(59).padStart(2, '0');
            breaks.time_min = time_min - 1;
            breaks.min_text = String(time_min).padStart(2, '0');

            this.setState({breaks});
        } else if (time_min === 0 && time_sec === 0) {
            this.setState({section : 'Works'});
            this.stopInterval();
        }
    }

    stopInterval(){
        let {startTimer, breakTimer} = this.state;
        this.setState({startTimer: clearInterval(startTimer), breakTimer: clearInterval(breakTimer)});
    }

    render() {
        const { section, works, breaks } = this.state;

        const playIcon = <FontAwesomeIcon icon={faPlay}/>;
        const pauseIcon = <FontAwesomeIcon icon={faPause}/>;
        const nextIcon = <FontAwesomeIcon icon={faFastForward}/>;
        const repeatIcon = <FontAwesomeIcon icon={faRedo}/>;

        return (
            <div className='vh-100 dt w-100 bg-washed-blue'>
                <div className='dtc tc'>
                    <h1>Pomodoro App</h1>
                    <h2 className='mt5'>{section}</h2>
                    <div className='flex flex-column'>
                        <div>
                            <Timer section={section} works={works} breaks={breaks} />
                        </div>
                        <div className="mt4">
                            <Button icon={playIcon} onClick={this.start}/>
                            <Button icon={pauseIcon} onClick={this.stop}/>
                            <Button icon={nextIcon} onClick={this.next}/>
                            <Button icon={repeatIcon} onClick={this.reset}/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;