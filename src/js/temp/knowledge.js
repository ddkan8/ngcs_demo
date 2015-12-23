define(function(){
    var $el = $('<div><span>this is knowledge page.</span><input type="button" value="new tab" /></div>');
        
    var initialize = function(index){
        $el.on('click', 'input', function(e){
            console.log(index.main)
            index.main.createTab('businessTab', 'js/temp/knowledge');
        });

        this.content = $el;
        return $el;
    }
    return initialize;
    //return { content:$el }
});