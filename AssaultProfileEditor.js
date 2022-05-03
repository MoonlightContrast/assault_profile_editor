//ウィジェットタイプ定数
/* 通常のウィジェット */
const WIDGET_TYPE_NORMAL = 'normal';

/* ルーン表示用のウィジェット */
const WIDGET_TYPE_RUNE = 'rune';

/* Grid.jsオブジェクト */
let grid = null;

/* Grid.jsにて算出された初期のセル横幅 */
let initGridCellWidth = 1;
let currentColumnCnt  = 1;

/* ID採番用番号+バックアップ */
let prevTimestamp = 0;
let prevNumbering = 0;
let idVsItems = {};

/* 1行の中の有効な領域の高さ(COMウインドウの縦横サイズ) */
let defaultHeight = null;

/* 1行そのものの高さ */
let initRowHeight = null;

/* 編集中のウィジェットデータ */
let editItem = null;

/* Vue.jsオブジェクト */
const appData = {

    /** バインドデータ */
    data() {
        return {
        
            // ヘッダ表示フラグ
            headerVisible:false,
        
            // 背景画像
            backgroudImg:null,
            
            // ウィジェット用配列
            items:[
                this.createWidgetData('001'), 
                this.createWidgetData('002'), 
                this.createWidgetData('003'),
            ], 
            
            // 色設定
            colorSetting: {
                
                comWindowBgColor    : '#00BFFF',    // COMウインドウ背景色
                comWindowFrColor    : '#4169E1',    // COMウインドウテキスト色
                normalWindowBgColor : '#1E90FF',    // 通常ウインドウ背景色
                normalWindowFrColor : '#00BFFF',    // 通常ウインドウテキスト色
                normalWindowCtColor : '#E0FFFF',    // 通常ウインドウテキスト色(カテゴリテキスト)
                lockWindowBgColor   : '#F5F5F5',    // ロック画面背景色
                lockWindowFrColor   : '#4169E1',    // ロック画面テキスト色
                opacity             : 0.75,         // 透明度
            },
            
            // 色設定用ワーク(色設定と同様 - モーダルでの設定ワーク用)
            colorSettingWork: {
                
                comWindowBgColor    : '#00BFFF',    // COMウインドウ背景色
                comWindowFrColor    : '#4169E1',    // COMウインドウテキスト色
                normalWindowBgColor : '#1E90FF',    // 通常ウインドウ背景色
                normalWindowFrColor : '#00BFFF',    // 通常ウインドウテキスト色
                normalWindowCtColor : '#E0FFFF',    // 通常ウインドウテキスト色(カテゴリテキスト)
                lockWindowBgColor   : '#F5F5F5',    // ロック画面背景色
                lockWindowFrColor   : '#4169E1',    // ロック画面テキスト色
                opacity             : 0.75,         // 透明度
            },
            
            // 編集対象ウィジェットアイテム
            editItemWork:this.createWidgetData('001'), 
            
            // 編集ウィジェットアイテム
            editItem:this.createWidgetData('001'), 
            
            // 非公式ルーン表示フラグ
            showUnofficialRune:false,
            
            // ルーン配列
            runeArray:[],
        };
    },

    /** mountedイベント */
    mounted : function () {
        
        // Gridstack.js初期表示
        grid = GridStack.init({cellHeight           : '6.75em',     // セルの高さを指定
                               column               : 'auto',
                               float                : true,         // ドラッグ中行拡張が必要な場合、拡張
                               disableOneColumnMode : true,         // 列サイズが小さくなった時に1列になるモードを停止
                              });
        grid.on('drag',   this.gridonDrag);    // ドラッグイベント実装
        grid.on('resize', this.gridonDrag);    // リサイズイベント実装
        
        // TODO : // Gridstack.js パネル全体の高さと行数から1行分の高さを決定
        // TODO : let gridStackPanel = this.$refs.gridStackPanel;
        // TODO : let gridRows       = parseInt(gridStackPanel.getAttribute('gs-current-row') || 0);
        // TODO : let rowHeightPx    = Math.floor(gridStackPanel.clientHeight / gridRows);
        // TODO : initRowHeight = rowHeightPx;
        // TODO : 
        // TODO : // 1行分の高さとウインドウの横幅から列数を算出
        // TODO : let gridColumns = Math.round(gridStackPanel.clientWidth / rowHeightPx);
        // TODO : grid.column(gridColumns);
        // TODO : console.log(gridColumns);
        
        // 初期データをIDvs連想配列に登録
        this.items.forEach(item => {
            idVsItems[item.dynamicId] = item;
        });
        
        // 初期表示されたcomWindowの縦横サイズを同一にする
        this.$refs.comElementsLeft.forEach(ele => {
            this.windowDOMLoaded(ele);
        });
        this.$refs.comElementsRight.forEach(ele => {
            this.windowDOMLoaded(ele);
        });
        
        // 色の初期値をCSSに反映、影色も更新する
        this.transferColorSettingToCSS(this.colorSetting);
        this.refreshShadowColor(this.colorSetting);
        
        // TODO : // リサイズイベント設定
        // TODO : window.onresize = this.windowResize;
        // TODO : window.addEventListener('resize', this.windowResize);
        
        // マウス座標取得イベント設定
        document.addEventListener('mousemove', this.bodyMousemove);
        
        // ルーン配列作成
        this.runeArray = {
            A0   : this.$refs.SVG_A0  ,    // ᚠ:FEOH
            A2   : this.$refs.SVG_A2  ,    // ᚢ:UR
            A3   : this.$refs.SVG_A3  ,    // ᚣ:YR
            A6   : this.$refs.SVG_A6  ,    // ᚦ:THORN
            A8   : this.$refs.SVG_A8  ,    // ᚨ:ANSUZ
            A9   : this.$refs.SVG_A9  ,    // ᚩ:OS
            AA   : this.$refs.SVG_AA  ,    // ᚪ:AC<Unofficial>
            B1   : this.$refs.SVG_B1  ,    // ᚱ:REID
            B2   : this.$refs.SVG_B2  ,    // ᚲ:KAUNA
            B3   : this.$refs.SVG_B3  ,    // ᚳ:CEN1
            B3_2 : this.$refs.SVG_B3_2,    // ᚳ:CEN2
            B7   : this.$refs.SVG_B7  ,    // ᚷ:GYFU
            B8   : this.$refs.SVG_B8  ,    // ᚸ:GAR<Unofficial>
            B9   : this.$refs.SVG_B9  ,    // ᚹ:WYNN
            BB   : this.$refs.SVG_BB  ,    // ᚻ:HAEGL<Unofficial>
            BB_2 : this.$refs.SVG_BB_2,    // ᚻ:HAEGL2<Unofficial>
            BE   : this.$refs.SVG_BE  ,    // ᚾ:NAUD
            C1   : this.$refs.SVG_C1  ,    // ᛁ:ISS
            C4   : this.$refs.SVG_C4  ,    // ᛄ:GER
            C7   : this.$refs.SVG_C7  ,    // ᛇ:YL<Unofficial>
            C8   : this.$refs.SVG_C8  ,    // ᛈ:PEORTH
            C9   : this.$refs.SVG_C9  ,    // ᛉ:EOLHX
            CB   : this.$refs.SVG_CB  ,    // ᛋ:SIGEL
            CB_2 : this.$refs.SVG_CB_2,    // ᛋ:SIGEL2
            CF   : this.$refs.SVG_CF  ,    // ᛏ:TYR
            D2   : this.$refs.SVG_D2  ,    // ᛒ:BEORC
            D6   : this.$refs.SVG_D6  ,    // ᛖ:EH
            D7   : this.$refs.SVG_D7  ,    // ᛗ:MAN
            DA   : this.$refs.SVG_DA  ,    // ᛚ:LOGR
            DD   : this.$refs.SVG_DD  ,    // ᛝ:ING
            DE   : this.$refs.SVG_DE  ,    // ᛞ:DAEG
            DF   : this.$refs.SVG_DF  ,    // ᛟ:ETHEL
            E0   : this.$refs.SVG_E0  ,    // ᛠ:EAR<Unofficial>
            E1   : this.$refs.SVG_E1  ,    // ᛡ:IOR<Unofficial>
            E2   : this.$refs.SVG_E2  ,    // ᛢ:CWEORTH<Unofficial>
            E3   : this.$refs.SVG_E3  ,    // ᛣ:CALC<Unofficial>
            E4   : this.$refs.SVG_E4  ,    // ᛤ:CEALC<Unofficial>
            E5   : this.$refs.SVG_E5  ,    // ᛥ:STAN<Unofficial>
            E5_2 : this.$refs.SVG_E5_2,    // ᛥ:SAN2<KUnofficial>
        };
    },
    
    /** 算出プロパティ */
    computed: {
    
        /** 背景画像 */
        compBackgroudImg : function() {
            return this.backgroudImg;
        },
    
        /** 透明度 */
        compColorSettingWork_Opacity : function() {
            return this.colorSettingWork.opacity;
        },
    },

    /** その他メソッド類 */
    methods: {
        
        /**
         * ヘッダ表示制御
         */
        bodyMousemove : function(evenet) {
            
            // マウスの座標がヘッダの座標内に含まれていれば表示する
            let headerEle = this.$refs.headerEle;
            if (headerEle.clientLeft <= event.pageX && event.pageX <= headerEle.clientWidth && 
                headerEle.clientTop  <= event.pageY && event.pageY <= headerEle.clientHeight)
            {
                this.headerVisible = true;
            } else {
                this.headerVisible = false;
            }
        },
        
        /**
         * ウィジェット用構造体生成
         */
        createWidgetData : function(comText) {
            return {
                    dynamicId          : this.numberingID('widget'),    // ID
                    widgetType         : WIDGET_TYPE_NORMAL,            // ウィジェット種別(通常／ルーン)
                    isRight            : true,                          // 右側フラグ
                    comVisible         : true,                          // COM表示フラグ
                    closeVisible       : false,                         // 閉じるパネル表示フラグ
                    lockMarkVisible    : true,                          // 鍵マーク表示フラグ
                    comText            : comText,                       // COMテキスト
                    comUpper           : true,                          // COMテキストの表示位置上
                    visibleWindowTitle : true,                          // ウィジェットタイトル表示フラグ
                    windowTitle        : 'P - 052',                     // ウィジェットタイトル
                    contents:[                                          // 
                        this.createContent(),                           // コンテンツ
                    ],                                                  // 
                    runeA              : '',                            // 【ルーンモード】ルーン1文字目
                    runeAmirror        : false,                         // 【ルーンモード】ルーン1文字目ミラー設定
                    runeB              : '',                            // 【ルーンモード】ルーン2文字目
                    runeBmirror        : false,                         // 【ルーンモード】ルーン2文字目ミラー設定
                    contentsVisible    : true,                          // コンテンツウインドウの表示制御 
                    widgetX            : 0,                             // ウィジェット座標X
                    widgetY            : 0,                             // ウィジェット座標Y
                    widgetWidth        : 0,                             // ウィジェットサイズ(横幅)
                    widgetHeight       : 0,                             // ウィジェットサイズ(縦幅)
                   };
        },
        
        /**
         * コンテンツ用構造体生成
         */
        createContent : function() {
            return {title:'タイトル', text:'テキスト'};
        },
        
        // TODO : /**
        // TODO :  * 画面リサイズイベント
        // TODO :  * リサイズ時に起動時に記憶したセル幅を維持するよう列数を増減させる
        // TODO :  */
        // TODO : windowResize : function() {
        // TODO :     //this.$nextTick(function() {
        // TODO :     
        // TODO :         // 現在のウインドウサイズからリサイズ後の列数を計算
        // TODO :         grid.destroy(false);
        // TODO :         let gridColumns = Math.floor(window.innerWidth / initRowHeight);
        // TODO : grid = GridStack.init({cellHeight           : '6.75em',     // セルの高さを指定
        // TODO :                        column               : gridColumns,  // 列幅をauto(なるべく正方形かつ余りの出ない列数)
        // TODO :                        float                : true,         // ドラッグ中行拡張が必要な場合、拡張
        // TODO :                        disableOneColumnMode : true,         // 列サイズが小さくなった時に1列になるモードを停止
        // TODO :                       });
        // TODO : grid.on('drag',   this.gridonDrag);    // ドラッグイベント実装
        // TODO : grid.on('resize', this.gridonDrag);    // リサイズイベント実装
        // TODO :         //grid.column(gridColumns);
        // TODO :         console.log('initRowHeight = ' + initRowHeight    );
        // TODO :         console.log('innerWidth    = ' + window.innerWidth);
        // TODO :         console.log('gridColumns   = ' + gridColumns      );
        // TODO :         console.log('----------------');
        // TODO :     //});
        // TODO : },
        
        /**
         * ドラッグイベント
         */
        gridonDrag : function(event, el) {
            
            // item取得／座標・サイズを反映
            let item  = idVsItems[el.id];
            let index = this.items.indexOf(item);
            this.items[index].widgetX      = el.getAttribute('gs-x') || 0;
            this.items[index].widgetY      = el.getAttribute('gs-y') || 0;
            this.items[index].widgetWidth  = el.getAttribute('gs-w') || 0;
            this.items[index].widgetHeight = el.getAttribute('gs-h') || 0;
            
            // runeBoundBoxのサイズに併せて内部のruneSVGサイズを決定
            let runeBoundBox = el.querySelector('.runeBoundBox');
            let boundWidth  = runeBoundBox.clientWidth;
            let boundHeight = runeBoundBox.clientHeight;
            
            // runeSVGのサイズ決定
            let runeSvgEle = el.querySelector('.runeSVG');
            if (boundWidth < boundHeight) {
                runeSvgEle.style.width  = '100%';
                runeSvgEle.style.height = 'initial';
            } else {
                runeSvgEle.style.width  = 'initial';
                runeSvgEle.style.height = '100%';
            }
        },
        
        /**
         * ウィジェットのDOMロードイベント
         * 縦横同一サイズにする
         */
        windowDOMLoaded : function(ele) {
        
            // COMウインドウの高さを取得
            if (!defaultHeight) {
                defaultHeight = ele.clientHeight;
            }

            let height = defaultHeight + "px";    // 高さ取得
            ele.style.height = height;            // 横幅を高さで設定(縦横同一サイズにする)
            ele.style.width  = height;            // 横幅を高さで設定(縦横同一サイズにする)
        },
        
        /** ID採番 */
        numberingID : function(prefix) {
            
            // 前回と同一ナンバリングであればナンバリング加算
            let currentTime = Date.now();
            if (currentTime == prevTimestamp) {
                prevNumbering += 1;
            } else {
                prevNumbering = 0;
            }
            prevTimestamp = currentTime;
            
            return prefix + currentTime + '' + prevNumbering;
        },
        
        /** ウィジェット追加 */
        addWidget : function() {
        
            // ウィジェットのデータ生成
            let appendWidget = this.createWidgetData('004');
            let dynamicId    = appendWidget.dynamicId;
            
            // ウィジェットデータを基にまずはDOMを生成(Vue.js Templateにて生成)
            idVsItems[dynamicId] = appendWidget;
            let len = this.items.push(appendWidget);
            
            // TemplateによるDOM生成後にGridstack.jsのでウィジェットとして登録
            this.$nextTick(function() {
                grid.makeWidget('#' + dynamicId);
                
                // COMウィジェットのサイズを縦横同一にする
                let comWindowEleLeft  = this.$refs.comElementsLeft[len - 1];
                let comWindowEleRight = this.$refs.comElementsRight[len - 1];
                this.windowDOMLoaded(comWindowEleLeft);
                this.windowDOMLoaded(comWindowEleRight);
            });
        },
        
        /**
         * ウィジェットのEnter処理(閉じるボタン表示)
         */
        windowMouseEnter : function(event) {
            this.switchWindowCloseButton(event.target, true);
        },
        
        /**
         * ウィジェットのLeave処理(閉じるボタン非表示)
         */
        windowMouseLeave : function(event) {
            this.switchWindowCloseButton(event.target, false);
        },
        
        /**
         * ウィジェットの閉じるボタン切り替え
         */
        switchWindowCloseButton : function(element, visible) {
        
            // ウィジェット内のCloseボタンを取得／表示
            let targetId = element.id;
            let item     = idVsItems[targetId];
            let itemIdx  = this.items.indexOf(item);
            if (itemIdx >= 0) {
            
                // Vue.jsが管理している配列で操作しないとTempleteに反映されない
                this.items[itemIdx].closeVisible = visible;
            }
        },
        
        /**
         * ウィジェットの閉じるボタン押下時処理
         */
        windowCloseButtonClick : function(event, item) {
            
            // ウィジェットの管理配列からitemを削除
            delete idVsItems[item.dynamicId];
            this.items.splice(this.items.indexOf(item), 1);
            grid.removeWidget(event.target);
        },
        
        /** 画像選択ダイアログ表示 */
        selectImage : function() {
            
            /** ダイアログ表示 */
            this.$refs.fileLoad.click();
        },
        
        /** 画像読み込み処理 */
        loadImage : function() {
            
            // 画像取得
            let lThis          = this;
            let fileImg = this.$refs.fileLoad.files[0];
            let reader  = new FileReader();
            reader.onload = function(event) {
                
                // アップロードデータのJSON化
                lThis.backgroudImg = reader.result;
                lThis.$refs.fileLoad.value = null;
            };
            reader.readAsDataURL(fileImg);
        },
        
        /**
         * 色設定画面 - 画面表示
         */
        showColorSetting : function() {
                        
            // 設定を反映
            this.copyColorSetting(this.colorSetting, this.colorSettingWork);
        },
        
        /**
         * 色設定画面 - 設定反映
         */
        applyColor : function() {
            
            // 設定を反映
            this.copyColorSetting(this.colorSettingWork, this.colorSetting);
            this.transferColorSettingToCSS(this.colorSetting);
            this.refreshShadowColor(this.colorSetting);
        },
        
        /**
         * 色設定構造体のコピー
         */
        copyColorSetting : function(from, to) {
            
            // 設定コピー
            if (from.comWindowBgColor    !== void 0) { to.comWindowBgColor    = from.comWindowBgColor;    }    // COMウインドウ背景色
            if (from.comWindowFrColor    !== void 0) { to.comWindowFrColor    = from.comWindowFrColor;    }    // COMウインドウテキスト色
            if (from.normalWindowBgColor !== void 0) { to.normalWindowBgColor = from.normalWindowBgColor; }    // 通常ウインドウ背景色
            if (from.normalWindowFrColor !== void 0) { to.normalWindowFrColor = from.normalWindowFrColor; }    // 通常ウインドウテキスト色
            if (from.normalWindowCtColor !== void 0) { to.normalWindowCtColor = from.normalWindowCtColor; }    // 通常ウインドウテキスト色(カテゴリテキスト)
            if (from.lockWindowBgColor   !== void 0) { to.lockWindowBgColor   = from.lockWindowBgColor;   }    // ロック画面背景色
            if (from.lockWindowFrColor   !== void 0) { to.lockWindowFrColor   = from.lockWindowFrColor;   }    // ロック画面テキスト色
            if (from.opacity             !== void 0) { to.opacity             = from.opacity;             }    // 透明度
        },
        
        /**
         * 色構造体をCSS変数に転送
         */
        transferColorSettingToCSS : function(colorSetting) {
            let varStyle = document.documentElement.style;
            varStyle.setProperty('--comWindowBgColor',    colorSetting.comWindowBgColor);
            varStyle.setProperty('--comWindowFrColor',    colorSetting.comWindowFrColor);
            varStyle.setProperty('--normalWindowBgColor', colorSetting.normalWindowBgColor);
            varStyle.setProperty('--normalWindowFrColor', colorSetting.normalWindowFrColor);
            varStyle.setProperty('--normalWindowCtColor', colorSetting.normalWindowCtColor);
            varStyle.setProperty('--lockWindowBgColor',   colorSetting.lockWindowBgColor);
            varStyle.setProperty('--lockWindowFrColor',   colorSetting.lockWindowFrColor);
            varStyle.setProperty('--opacity',             colorSetting.opacity);
        },
        
        /**
         * 色構造体から影色を構築
         */
        refreshShadowColor : function(colorSetting) {
            let varStyle = document.documentElement.style;
            varStyle.setProperty('--comWindowBgColorShadow',    this.calcShadowColor(colorSetting.comWindowBgColor));
            varStyle.setProperty('--comWindowFrColorShadow',    this.calcShadowColor(colorSetting.comWindowFrColor));
            varStyle.setProperty('--normalWindowBgColorShadow', this.calcShadowColor(colorSetting.normalWindowBgColor));
            varStyle.setProperty('--normalWindowFrColorShadow', this.calcShadowColor(colorSetting.normalWindowFrColor));
            varStyle.setProperty('--normalWindowCtColorShadow', this.calcShadowColor(colorSetting.normalWindowCtColor));
            varStyle.setProperty('--lockWindowBgColorShadow',   this.calcShadowColor(colorSetting.lockWindowBgColor));
            varStyle.setProperty('--lockWindowFrColorShadow',   this.calcShadowColor(colorSetting.lockWindowFrColor));
        },
        
        /**
         * 影色構築
         */
        calcShadowColor : function(baseColor) {
            
            // 元の色をRGBに分解
            let red   = parseInt(baseColor.substring(1,3), 16);
            let green = parseInt(baseColor.substring(3,5), 16);
            let blue  = parseInt(baseColor.substring(5,7), 16);            
            
            // RGBを50%減する
            const SHADOW_RATE = 0.5;
            let shadowRed   = Math.round(red   * SHADOW_RATE);
            let shadowGreen = Math.round(green * SHADOW_RATE);
            let shadowBlue  = Math.round(blue  * SHADOW_RATE);

            // 16進数化
            let shadowRedHex   = (('00' + shadowRed  .toString(16).toUpperCase()).substr(-2));
            let shadowGreenHex = (('00' + shadowGreen.toString(16).toUpperCase()).substr(-2));
            let shadowBlueHex  = (('00' + shadowBlue .toString(16).toUpperCase()).substr(-2));
            
            // 影の色をカラーコード化
            let shadowColorCode = '#' + shadowRedHex + shadowGreenHex + shadowBlueHex;
            return shadowColorCode;
        },
        
        /**
         * ウィジェット表示イベント
         */
        editWidget : function(item) {
            
            // 表示対象のウィジェットのアイテムを編集対象としてコピー
            editItem = item;
            this.copyWidgetItem(item, this.editItemWork);
        },
        
        /**
         * ウィジェット確定イベント
         */
        applyWidget : function() {
            
            // ウィジェットの編集結果を管理用構造体に設定
            this.copyWidgetItem(this.editItemWork, editItem);
            
            // ウィジェットタイプがルーンの場合
            // ルーン画像を構築
            if (editItem.widgetType == WIDGET_TYPE_RUNE) {
                this.$nextTick(function() {
                    this.applyWidgetRuneSVG(editItem);
                });
            }
        },
        
        /**
         * ウィジェットにルーン画像反映
         */
        applyWidgetRuneSVG : function(item) {
            
            // 1文字目と2文字目のルーンのSVGを特定
            let runeDrawer = AssaultRuneDrawer.createInstance2(item.runeA, item.runeB);
            runeDrawer.setStrokeWidthForAllLayer(5);
            runeDrawer.setStrokeColorForAllLayer(this.colorSetting.normalWindowFrColor);
            runeDrawer.layers[0].mirror = item.runeAmirror;
            runeDrawer.layers[1].mirror = item.runeBmirror;
            runeDrawer.drawSVGElement('#' + item.dynamicId + ' .runeSVG');
            
            // SVGタグからdataURIに変換してimgタグへセット
            let index   = this.items.indexOf(item);
            let svgData = new XMLSerializer().serializeToString(this.$refs.runeSVG[index]);
            let dataURI = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
        },
        
        /**
         * ルーン画像取得
         */
        getRuneImage : function(runeChar) {
            if (runeChar !== void 0 && runeChar != null &&
                runeChar != '') 
            {
                return this.runeArray[runeChar].src;
            } else {
                return null;
            }
        },
        
        /**
         * ウィジェットアイテム構造体コピー
         */
        copyWidgetItem : function(from, to) {
        
            // 設定のコピー
            if (from.dynamicId          !== void 0) { to.dynamicId          = from.dynamicId;          }    // ID
            if (from.widgetType         !== void 0) { to.widgetType         = from.widgetType          }    // ウィジェット種別(通常／ルーン)
            if (from.isRight            !== void 0) { to.isRight            = from.isRight;            }    // 右側フラグ
            if (from.comVisible         !== void 0) { to.comVisible         = from.comVisible;         }    // COM表示フラグ
            if (from.lockMarkVisible    !== void 0) { to.lockMarkVisible    = from.lockMarkVisible;    }    // 鍵マーク表示フラグ
            if (from.comText            !== void 0) { to.comText            = from.comText;            }    // COMテキスト
            if (from.comUpper           !== void 0) { to.comUpper           = from.comUpper;           }    // COMテキストの表示位置上
            if (from.visibleWindowTitle !== void 0) { to.visibleWindowTitle = from.visibleWindowTitle; }    // ウィジェットタイトル表示フラグ
            if (from.windowTitle        !== void 0) { to.windowTitle        = from.windowTitle;        }    // ウィジェットタイトル
            if (from.runeA              !== void 0) { to.runeA              = from.runeA;              }    // 【ルーンモード】ルーン1文字目
            if (from.runeB              !== void 0) { to.runeB              = from.runeB;              }    // 【ルーンモード】ルーン2文字目 
            if (from.runeAmirror        !== void 0) { to.runeAmirror        = from.runeAmirror;        }    // 【ルーンモード】ルーン1文字目ミラー設定
            if (from.runeBmirror        !== void 0) { to.runeBmirror        = from.runeBmirror;        }    // 【ルーンモード】ルーン2文字目ミラー設定
            if (from.contentsVisible    !== void 0) { to.contentsVisible    = from.contentsVisible;    }    // コンテンツウインドウの表示制御 
            if (from.widgetX            !== void 0) { to.widgetX            = from.widgetX;            }    // ウィジェット座標X
            if (from.widgetY            !== void 0) { to.widgetY            = from.widgetY;            }    // ウィジェット座標Y
            if (from.widgetWidth        !== void 0) { to.widgetWidth        = from.widgetWidth;        }    // ウィジェットサイズ(横幅)
            if (from.widgetHeight       !== void 0) { to.widgetHeight       = from.widgetHeight;       }    // ウィジェットサイズ(縦幅)

            // コンテンツのコピー
            to.contents = [];
            from.contents.forEach(fromContent => {
                to.contents.push({
                    title : fromContent.title,
                    text  : fromContent.text,
                });
            });
            
            // 左向き→右向き or 右向き→左向きと変わった場合
            // コンテンツをリバース
            if (from.lockMarkVisible !== void 0 &&
                  to.lockMarkVisible !== void 0)
            {
                if (from.lockMarkVisible != to.lockMarkVisible) {
                    to.contents.reverse();
                }
            }
            
        },
        
        /**
         * コンテンツ追加ボタン
         */
        addContent : function() {
            this.editItemWork.contents.push(this.createContent());
        },
        
        /**
         * コンテンツの削除
         */
        delContent : function(contents, index) {
            contents.splice(index, 1);
        },
        
        /**
         * プロファイル保存
         */
        saveProfile : function() {
            
            // 保存用データ作成
            let saveData = {
                backgroudImg: this.backgroudImg,    // 背景画像
                items       : this.items,           // ウィジェット用配列
                colorSetting: this.colorSetting,    // 色設定
            };
            
            // データをJsonへ変換
            let dataJson = JSON.stringify(saveData);
            
            // Blob型へ変換
            let dataBlob = new Blob([dataJson], {type : 'text/plan'});
            
            // BlobをURL形式に変換
            let dataURL = URL.createObjectURL(dataBlob);
            
            // Aタグでダウンロード処理実行
            this.$refs.downloadLink.download = 'profile.assault'
            this.$refs.downloadLink.href     = dataURL;
            this.$refs.downloadLink.click();
        },
        
        /**
         * プロファイル読込クリック
         */
        loadProfileOnclick : function() {
            this.$refs.profileLoad.click();
        },
        
        /**
         * プロファイル読込処理
         */
        loadProfileOnchange : function() {
            
            // アップロードデータ取得
            let lThis          = this;
            let binLoadProfile = this.$refs.profileLoad.files[0];
            let reader         = new FileReader();
            reader.onload = function(event) {
                
//// TODO : Grid.js再作成
//grid.destroy(false);
//grid = GridStack.init({cellHeight           : '6.75em',     // セルの高さを指定
//                       column               : 'auto',
//                       float                : true,         // ドラッグ中行拡張が必要な場合、拡張
//                       disableOneColumnMode : true,         // 列サイズが小さくなった時に1列になるモードを停止
//                      });
//grid.on('drag',   lThis.gridonDrag);    // ドラッグイベント実装
//grid.on('resize', lThis.gridonDrag);    // リサイズイベント実装
                
                // アップロードデータのJSON化
                let strLoadProfile = reader.result;
                let loadProfile    = JSON.parse(strLoadProfile);
                
                // ロードされた情報を取り込む
                lThis.backgroudImg = loadProfile.backgroudImg;    // 背景画像
                
                // 色設定
                lThis.copyColorSetting(loadProfile.colorSetting, lThis.colorSetting);
                lThis.transferColorSettingToCSS(lThis.colorSetting);
                lThis.refreshShadowColor(lThis.colorSetting);
                
                // 既存のウィジェットを削除する
                let reverseItems = [];                                        // itemを逆転させた配列を作成
                lThis.items.forEach(item => { reverseItems.push(item); });    // itemをコピー
                reverseItems.reverse();                                       // コピーしたitemを反転
                reverseItems.forEach(item => {
                    let dummyEvent = {target : document.querySelector('#' + item.dynamicId)};
                    lThis.windowCloseButtonClick(dummyEvent, item);
                });
                
                // ウィジェット用配列
                idVsItems = {};
                lThis.items.splice(0, lThis.items.length);
                loadProfile.items.forEach(item => {
                
                    // ウィジェットオブジェクトの内容をコピー
                    let newItem = lThis.createWidgetData('');
                    let currentDynamicId = newItem.dynamicId;
                    lThis.copyWidgetItem(item, newItem);
                    newItem.dynamicId = currentDynamicId;
                    lThis.items.push(newItem);
                    idVsItems[newItem.dynamicId] = newItem;
                });
                
                // 作成したitemに対して新しいウィジェットを作成
                // TemplateによるDOM生成後にGridstack.jsのでウィジェットとして登録
                lThis.$nextTick(function() {
                    lThis.items.forEach((item, index) => {
                        
                        // Gridstack.js属性を追加する
                        let dynamicId = '#' + item.dynamicId;
                        let itemEle = document.querySelector(dynamicId);
                        itemEle.setAttribute('gs-x', item.widgetX     );    // TODO : 存在するプロパティのみ対象にする
                        itemEle.setAttribute('gs-y', item.widgetY     );    // TODO : 存在するプロパティのみ対象にする
                        itemEle.setAttribute('gs-w', item.widgetWidth );    // TODO : 存在するプロパティのみ対象にする
                        itemEle.setAttribute('gs-h', item.widgetHeight);    // TODO : 存在するプロパティのみ対象にする
                        
                        // 作成したDivをウィジェット化
                        grid.makeWidget(dynamicId);
                        
                        // COMウィジェットのサイズを縦横同一にする
                        let comWindowEleLeft  = lThis.$refs.comElementsLeft[index];
                        let comWindowEleRight = lThis.$refs.comElementsRight[index];
                        lThis.windowDOMLoaded(comWindowEleLeft);
                        lThis.windowDOMLoaded(comWindowEleRight);
                        
                        // ウィジェットタイプがルーンの場合
                        // ルーン画像を構築
                        if (item.widgetType == WIDGET_TYPE_RUNE) {
                            lThis.applyWidgetRuneSVG(item);
                            lThis.gridonDrag(null, itemEle);
                        }
                    });
                });
                lThis.$refs.profileLoad.value = null;
            };
            reader.readAsText(binLoadProfile);
        },
    }
};

// Vue.js開始
Vue.createApp(appData).mount('#body');
