try {
    class TimeTracker{
        
        constructor(){
            this.jsonData = {};
            this.listItems = document.querySelectorAll('.report__list_item');
            this.currentTimeFrames = document.querySelectorAll('.timeframe__current');
            this.previousTimeFrames = document.querySelectorAll('.timeframe__previous');
        }

        async loadData(){
            const data = await fetch('./data.json');
            this.jsonData = await data.json();
            // console.log('Data', this.jsonData);
            this.getDataForTimeframe();
        }

        getDataForTimeframe(timeframe = 'weekly'){
            // console.log('timeframe', timeframe, this.jsonData);
            this.jsonData.forEach((dataItem) => {
                const dataOfTimeFrame = dataItem.timeframes[timeframe];
                this.currentTimeFrames.forEach((currentFrame) => {
                    if(currentFrame.dataset.card === dataItem.title.toLowerCase()){
                        let currentUpto = 0;     
                        const increaseCount = () => {
                            currentFrame.textContent = currentUpto;                            
                            if(currentUpto === dataOfTimeFrame.current){
                                clearInterval(count);
                            }
                            ++currentUpto;
                        }
                        const count = setInterval(increaseCount);
                    }
                })
                this.previousTimeFrames.forEach((previousFrame) => {
                    if(previousFrame.dataset.card === dataItem.title.toLowerCase()){
                        let previousUpto = 0;     
                        const increaseCount = () => {        
                            previousFrame.textContent = previousUpto;
                            if(previousUpto === dataOfTimeFrame.previous){
                                clearInterval(count);
                            }
                            ++previousUpto;
                        }
                        const count = setInterval(increaseCount);
                    }
                })
            })
        }

        init(){
            this.loadData();

            this.listItems.forEach((listItem) => {
                listItem.addEventListener('click', (e) => {
                    // console.log('e', e);
                    const dataTimeFrame = e.target.dataset.active;
                    this.getDataForTimeframe(dataTimeFrame);
                    this.listItems.forEach((listItem) => {listItem.classList.remove('activeList')});
                    e.target.classList.add('activeList');
                })
            })
        }
    }

    const timeTracker = new TimeTracker();
    timeTracker.init();

} catch (error) {
    console.log('Error detected...', error);
}