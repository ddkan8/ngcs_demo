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
    <div class="panel mtF7">
        <div class="topW"><div class="right"><div class="center"></div></div></div>
        <div class="centerW">
        <div class="right"><div class="center">
            <div class="msgInfo">
                <div class="msgType">
                    <span class="icon {{_channel channel}} fade"></span>
                    <!--<div class="bubble strong"></div>-->
                </div>
                <div class="message">
                    <h1><span style="display: none;">18:27</span><strong>{{name}}</strong></h1>
                    <div>{{message}} </div>
                </div>
            </div>
        </div></div></div>
        <div class="bottomW"><div class="right"><div class="center"></div></div></div>
    </div>
    {{/each}}
</div>
