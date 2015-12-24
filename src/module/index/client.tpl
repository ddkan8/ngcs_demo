<div class="searchPanel">
    <!--<a class="searchBtn"></a>-->
    <span class="peopleNum"><strong>{{bean.waitPersonNum}}</strong>人等待中</span>
</div>
<div class="panel">
    <div class="topW"><div class="right"><div class="center"></div></div></div>
    <div class="centerW">
    <div class="right"><div class="center">
        <div class="seeHistory">
            <img src="src/assets/img/appNew/icon-history_03.png" alt=""/>
            <span>查看历史</span>
        </div>
        <div class="tirggerRequest">
            <img src="src/assets/img/appNew/icon-next-apply_05.png" alt=""/>
            <span>下一个请求</span>
        </div>
    </div></div></div>
    <div class="bottomW"><div class="right"><div class="center"></div></div></div>
</div>
<div id="J_clientList">
    {{#each beans}}
    
    {{/each}}
</div>
