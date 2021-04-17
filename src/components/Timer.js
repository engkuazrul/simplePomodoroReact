const Timer = ({section, works, breaks}) => {
    let min, sec;

    if(section === 'Work'){
        min = works.min_text;
        sec = works.sec_text;
    } else {
        min = breaks.min_text;
        sec = breaks.sec_text;
    }
    
    return (
        <div className={`mt3 ba bw3 br-100 dib vh-50 w-25 pa4 tc ${section === "Work" ? "b--light-blue" : "b--green"}`}>
            <div className='h-100 w-100 flex items-center justify-center'>
                <h3 className='f1'>{min}</h3>
                <h3 className='ph4 f1'> : </h3>
                <h3 className='f1'>{sec}</h3>
            </div>
        </div>
    );
}

export default Timer;