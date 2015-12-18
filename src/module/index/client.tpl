
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
    <!-- 
 state1 
    <div class="panel mtF7">
        <div class="topW"><div class="right"><div class="center"></div></div></div>
        <div class="centerW">
        <div class="right"><div class="center">
            <div class="msgInfo state1">
                <div class="msgType">
                    <span class="icon feixin"></span>
                    <div class="bubble strong">1</div>
                </div>
                <div class="message">
                    <h1><span>12:10</span><strong>刘西</strong></h1>
                    <div>我刚充的话费怎么就不足10元呢？？</div>
                </div>
            </div>
        </div></div></div>
        <div class="bottomW"><div class="right"><div class="center"></div></div></div>
    </div>
    <div class="panel mtF7">
        <div class="topW"><div class="right"><div class="center"></div></div></div>
        <div class="centerW"><div class="right"><div class="center">
            <div class="msgInfo line2">
                <div class="msgType">
                    <span class="icon weixin"></span>
                    <div class="bubble">1</div>
                </div>
                <div class="message">
                    <h1><span>12:10</span><strong>杨洋</strong></h1>
                    <div>我的Iphone 4 越狱后无法上网了，请问怎么处理？</div>
                </div>
            </div>
        </div></div></div>
        <div class="bottomW"><div class="right"><div class="center"></div></div></div>
    </div>
    <div class="panel mtF7">
        <div class="topW"><div class="right"><div class="center"></div></div></div>
        <div class="centerW"><div class="right"><div class="center">
            <div class="msgInfo select">
                <div class="msgType">
                    <span class="icon weixin"></span>
                    <div class="bubble">1</div>
                </div>
                <div class="message">
                    <h1><span>12:10</span><strong>王子希</strong></h1>
                    <div>你好，你们的华为Ascend P1手机，有没有红色的？</div>
                </div>
            </div>
        </div></div></div>
        <div class="bottomW"><div class="right"><div class="center"></div></div></div>
    </div> -->
