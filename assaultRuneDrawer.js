/**
 * ルーン描画ライブラリ
 */
class AssaultRuneDrawer {
    
    /* x座標のパターン */
    static columns = {
        colA : 11.909111,
        colB : 31.007965,
        colC : 50.106814,
        colD : 69.205671,
        colE : 88.30452 ,
    }
    
    /* y座標のパターン */
    static rows = {
        rowF : 11.957449,
        rowG : 31.056303,
        rowH : 40.605727,
        rowI : 50.155153,
        rowJ : 59.704581,
        rowK : 69.254007,
        rowL : 88.352857,
    }
    
    /* ルーン頂点定義 */
    static runePointers = {
        AF : { x : AssaultRuneDrawer.columns.colA, y : AssaultRuneDrawer.rows.rowF},
        CF : { x : AssaultRuneDrawer.columns.colC, y : AssaultRuneDrawer.rows.rowF},
        EF : { x : AssaultRuneDrawer.columns.colE, y : AssaultRuneDrawer.rows.rowF},
        AG : { x : AssaultRuneDrawer.columns.colA, y : AssaultRuneDrawer.rows.rowG},
        CG : { x : AssaultRuneDrawer.columns.colC, y : AssaultRuneDrawer.rows.rowG},
        EG : { x : AssaultRuneDrawer.columns.colE, y : AssaultRuneDrawer.rows.rowG},
        BH : { x : AssaultRuneDrawer.columns.colB, y : AssaultRuneDrawer.rows.rowH},
        DH : { x : AssaultRuneDrawer.columns.colD, y : AssaultRuneDrawer.rows.rowH},
        AI : { x : AssaultRuneDrawer.columns.colA, y : AssaultRuneDrawer.rows.rowI},
        CI : { x : AssaultRuneDrawer.columns.colC, y : AssaultRuneDrawer.rows.rowI},
        EI : { x : AssaultRuneDrawer.columns.colE, y : AssaultRuneDrawer.rows.rowI},
        BJ : { x : AssaultRuneDrawer.columns.colB, y : AssaultRuneDrawer.rows.rowJ},
        DJ : { x : AssaultRuneDrawer.columns.colD, y : AssaultRuneDrawer.rows.rowJ},
        AK : { x : AssaultRuneDrawer.columns.colA, y : AssaultRuneDrawer.rows.rowK},
        CK : { x : AssaultRuneDrawer.columns.colC, y : AssaultRuneDrawer.rows.rowK},
        EK : { x : AssaultRuneDrawer.columns.colE, y : AssaultRuneDrawer.rows.rowK},
        AL : { x : AssaultRuneDrawer.columns.colA, y : AssaultRuneDrawer.rows.rowL},
        CL : { x : AssaultRuneDrawer.columns.colC, y : AssaultRuneDrawer.rows.rowL},
        EL : { x : AssaultRuneDrawer.columns.colE, y : AssaultRuneDrawer.rows.rowL},
    }
    
    /* ルーン線分定義 */
    static runePaths = {
         0 : { from : AssaultRuneDrawer.runePointers.AF, to : AssaultRuneDrawer.runePointers.AG, },
         1 : { from : AssaultRuneDrawer.runePointers.AF, to : AssaultRuneDrawer.runePointers.CG, },
         2 : { from : AssaultRuneDrawer.runePointers.CF, to : AssaultRuneDrawer.runePointers.CG, },
         3 : { from : AssaultRuneDrawer.runePointers.CG, to : AssaultRuneDrawer.runePointers.EF, },
         4 : { from : AssaultRuneDrawer.runePointers.EF, to : AssaultRuneDrawer.runePointers.EG, },
         5 : { from : AssaultRuneDrawer.runePointers.AG, to : AssaultRuneDrawer.runePointers.AI, },
         6 : { from : AssaultRuneDrawer.runePointers.AG, to : AssaultRuneDrawer.runePointers.BH, },
         7 : { from : AssaultRuneDrawer.runePointers.BH, to : AssaultRuneDrawer.runePointers.CG, },
         8 : { from : AssaultRuneDrawer.runePointers.CG, to : AssaultRuneDrawer.runePointers.CI, },
         9 : { from : AssaultRuneDrawer.runePointers.CG, to : AssaultRuneDrawer.runePointers.DH, },
        10 : { from : AssaultRuneDrawer.runePointers.DH, to : AssaultRuneDrawer.runePointers.EG, },
        11 : { from : AssaultRuneDrawer.runePointers.EG, to : AssaultRuneDrawer.runePointers.EI, },
        12 : { from : AssaultRuneDrawer.runePointers.AI, to : AssaultRuneDrawer.runePointers.BH, },
        13 : { from : AssaultRuneDrawer.runePointers.BH, to : AssaultRuneDrawer.runePointers.CI, },
        14 : { from : AssaultRuneDrawer.runePointers.CI, to : AssaultRuneDrawer.runePointers.DH, },
        15 : { from : AssaultRuneDrawer.runePointers.DH, to : AssaultRuneDrawer.runePointers.EI, },
        16 : { from : AssaultRuneDrawer.runePointers.AI, to : AssaultRuneDrawer.runePointers.AK, },
        17 : { from : AssaultRuneDrawer.runePointers.AI, to : AssaultRuneDrawer.runePointers.BJ, },
        18 : { from : AssaultRuneDrawer.runePointers.BJ, to : AssaultRuneDrawer.runePointers.CI, },
        19 : { from : AssaultRuneDrawer.runePointers.CI, to : AssaultRuneDrawer.runePointers.CK, },
        20 : { from : AssaultRuneDrawer.runePointers.CI, to : AssaultRuneDrawer.runePointers.DJ, },
        21 : { from : AssaultRuneDrawer.runePointers.DJ, to : AssaultRuneDrawer.runePointers.EI, },
        22 : { from : AssaultRuneDrawer.runePointers.EI, to : AssaultRuneDrawer.runePointers.EK, },
        23 : { from : AssaultRuneDrawer.runePointers.AK, to : AssaultRuneDrawer.runePointers.BJ, },
        24 : { from : AssaultRuneDrawer.runePointers.BJ, to : AssaultRuneDrawer.runePointers.CK, },
        25 : { from : AssaultRuneDrawer.runePointers.CK, to : AssaultRuneDrawer.runePointers.DJ, },
        26 : { from : AssaultRuneDrawer.runePointers.DJ, to : AssaultRuneDrawer.runePointers.EK, },
        27 : { from : AssaultRuneDrawer.runePointers.AK, to : AssaultRuneDrawer.runePointers.AL, },
        28 : { from : AssaultRuneDrawer.runePointers.AL, to : AssaultRuneDrawer.runePointers.CK, },
        29 : { from : AssaultRuneDrawer.runePointers.CK, to : AssaultRuneDrawer.runePointers.CL, },
        30 : { from : AssaultRuneDrawer.runePointers.CK, to : AssaultRuneDrawer.runePointers.EL, },
        31 : { from : AssaultRuneDrawer.runePointers.EK, to : AssaultRuneDrawer.runePointers.EL, },
    }
    
    /* ルーン文字ごとの線分一覧 */
    static runes = {
        A0   :{ paths : [AssaultRuneDrawer.runePaths[ 2],AssaultRuneDrawer.runePaths[ 3],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[14],AssaultRuneDrawer.runePaths[10],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[29]] },                                                                                                                                                                                                                                                                                                                                                                                                                                    // ᚠ:FEOH
        A2   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[27],AssaultRuneDrawer.runePaths[29]] },                                                                                                                                                                                                                                                                                                                                                                                                    // ᚢ:UR
        A3   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[ 9],AssaultRuneDrawer.runePaths[15],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[22],AssaultRuneDrawer.runePaths[27],AssaultRuneDrawer.runePaths[29],AssaultRuneDrawer.runePaths[31]] },                                                                                                                                                                                                                                                                                                                                    // ᚣ:YR
        A6   :{ paths : [AssaultRuneDrawer.runePaths[ 2],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[ 9],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[15],AssaultRuneDrawer.runePaths[21],AssaultRuneDrawer.runePaths[25],AssaultRuneDrawer.runePaths[29]] },                                                                                                                                                                                                                                                                                                                                                                                                    // ᚦ:THORN
        A8   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[ 6],AssaultRuneDrawer.runePaths[13],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[27]] },                                                                                                                                                                                                                                                                                                                                                                                                                                    // ᚨ:ANSUZ
        A9   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 3],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[ 6],AssaultRuneDrawer.runePaths[13],AssaultRuneDrawer.runePaths[14],AssaultRuneDrawer.runePaths[10],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[27]] },                                                                                                                                                                                                                                                                                                                                    // ᚩ:OS
        AA   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 3],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[ 6],AssaultRuneDrawer.runePaths[13],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[27]] },                                                                                                                                                                                                                                                                                                                                                                                                    // ᚪ:AC<Unofficial>
        B1   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[12],AssaultRuneDrawer.runePaths[ 7],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[17],AssaultRuneDrawer.runePaths[24],AssaultRuneDrawer.runePaths[27]] },                                                                                                                                                                                                                                                                                                                                                                    // ᚱ:REID
        B2   :{ paths : [AssaultRuneDrawer.runePaths[14],AssaultRuneDrawer.runePaths[10],AssaultRuneDrawer.runePaths[20],AssaultRuneDrawer.runePaths[26]] },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // ᚲ:KAUNA
        B3   :{ paths : [AssaultRuneDrawer.runePaths[ 2],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[20],AssaultRuneDrawer.runePaths[26],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[29]] },                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // ᚳ:CEN1
        B3_2 :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[17],AssaultRuneDrawer.runePaths[24],AssaultRuneDrawer.runePaths[27]] },                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // ᚳ:CEN2
        B7   :{ paths : [AssaultRuneDrawer.runePaths[ 6],AssaultRuneDrawer.runePaths[13],AssaultRuneDrawer.runePaths[14],AssaultRuneDrawer.runePaths[10],AssaultRuneDrawer.runePaths[18],AssaultRuneDrawer.runePaths[23],AssaultRuneDrawer.runePaths[20],AssaultRuneDrawer.runePaths[26]] },                                                                                                                                                                                                                                                                                                                                                                                                    // ᚷ:GYFU
        B8   :{ paths : [AssaultRuneDrawer.runePaths[ 6],AssaultRuneDrawer.runePaths[13],AssaultRuneDrawer.runePaths[14],AssaultRuneDrawer.runePaths[10],AssaultRuneDrawer.runePaths[12],AssaultRuneDrawer.runePaths[17],AssaultRuneDrawer.runePaths[20],AssaultRuneDrawer.runePaths[26],AssaultRuneDrawer.runePaths[21],AssaultRuneDrawer.runePaths[15],AssaultRuneDrawer.runePaths[18],AssaultRuneDrawer.runePaths[23],] },                                                                                                                                                                                                                                                                   // ᚸ:GAR<Unofficial>
        B9   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[12],AssaultRuneDrawer.runePaths[ 7],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[27]] },                                                                                                                                                                                                                                                                                                                                                                                                                                    // ᚹ:WYNN
        BB   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 2],AssaultRuneDrawer.runePaths[ 6],AssaultRuneDrawer.runePaths[13],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[17],AssaultRuneDrawer.runePaths[24],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[27],AssaultRuneDrawer.runePaths[29]] },                                                                                                                                                                                                                                                                    // ᚻ:HAEGL<Unofficial>
        BB_2 :{ paths : [AssaultRuneDrawer.runePaths[ 2],AssaultRuneDrawer.runePaths[ 4],AssaultRuneDrawer.runePaths[ 9],AssaultRuneDrawer.runePaths[15],AssaultRuneDrawer.runePaths[11],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[20],AssaultRuneDrawer.runePaths[26],AssaultRuneDrawer.runePaths[22],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[29],AssaultRuneDrawer.runePaths[31]] },                                                                                                                                                                                                                                                                    // ᚻ:HAEGL2<Unofficial>
        BE   :{ paths : [AssaultRuneDrawer.runePaths[ 2],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[ 6],AssaultRuneDrawer.runePaths[13],AssaultRuneDrawer.runePaths[20],AssaultRuneDrawer.runePaths[26],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[29]] },                                                                                                                                                                                                                                                                                                                                                                                                    // ᚾ:NAUD
        C1   :{ paths : [AssaultRuneDrawer.runePaths[ 2],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[29]] },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // ᛁ:ISS
        C4   :{ paths : [AssaultRuneDrawer.runePaths[ 2],AssaultRuneDrawer.runePaths[ 7],AssaultRuneDrawer.runePaths[12],AssaultRuneDrawer.runePaths[17],AssaultRuneDrawer.runePaths[24],AssaultRuneDrawer.runePaths[ 9],AssaultRuneDrawer.runePaths[15],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[29],AssaultRuneDrawer.runePaths[25],AssaultRuneDrawer.runePaths[21]] },                                                                                                                                                                                                                                                                    // ᛄ:GER
        C7   :{ paths : [AssaultRuneDrawer.runePaths[17],AssaultRuneDrawer.runePaths[24],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[ 9],AssaultRuneDrawer.runePaths[15]] },                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // ᛇ:YL<Unofficial>
        C8   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 3],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[27],AssaultRuneDrawer.runePaths[28],AssaultRuneDrawer.runePaths[30]] },                                                                                                                                                                                                                                                                                                                                                                                                    // ᛈ:PEORTH
        C9   :{ paths : [AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 2],AssaultRuneDrawer.runePaths[ 3],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[29]] },                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // ᛉ:EOLHX
        CB   :{ paths : [AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[23],AssaultRuneDrawer.runePaths[18],AssaultRuneDrawer.runePaths[14],AssaultRuneDrawer.runePaths[10],AssaultRuneDrawer.runePaths[11],AssaultRuneDrawer.runePaths[22]] },                                                                                                                                                                                                                                                                                                                                                                                                    // ᛋ:SIGEL
        CB_2 :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[23],AssaultRuneDrawer.runePaths[18],AssaultRuneDrawer.runePaths[14],AssaultRuneDrawer.runePaths[10],AssaultRuneDrawer.runePaths[11],AssaultRuneDrawer.runePaths[22],AssaultRuneDrawer.runePaths[31]] },                                                                                                                                                                                                                                                                                                                                    // ᛋ:SIGEL2
        CF   :{ paths : [AssaultRuneDrawer.runePaths[28],AssaultRuneDrawer.runePaths[25],AssaultRuneDrawer.runePaths[21],AssaultRuneDrawer.runePaths[15],AssaultRuneDrawer.runePaths[ 9],AssaultRuneDrawer.runePaths[22],AssaultRuneDrawer.runePaths[31]] },                                                                                                                                                                                                                                                                                                                                                                                                                                    // ᛏ:TYR
        D2   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[ 7],AssaultRuneDrawer.runePaths[12],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[17],AssaultRuneDrawer.runePaths[24],AssaultRuneDrawer.runePaths[27],AssaultRuneDrawer.runePaths[28]] },                                                                                                                                                                                                                                                                                                                                    // ᛒ:BEORC
        D6   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 3],AssaultRuneDrawer.runePaths[ 4],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[11],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[22],AssaultRuneDrawer.runePaths[27],AssaultRuneDrawer.runePaths[31]] },                                                                                                                                                                                                                                                                                                                                    // ᛖ:EH
        D7   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 3],AssaultRuneDrawer.runePaths[ 4],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[12],AssaultRuneDrawer.runePaths[ 7],AssaultRuneDrawer.runePaths[ 9],AssaultRuneDrawer.runePaths[15],AssaultRuneDrawer.runePaths[11],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[22],AssaultRuneDrawer.runePaths[27],AssaultRuneDrawer.runePaths[31]] },                                                                                                                                                                                                    // ᛗ:MAN
        DA   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[27]] },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // ᛚ:LOGR
        DD   :{ paths : [AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 3],AssaultRuneDrawer.runePaths[ 7],AssaultRuneDrawer.runePaths[12],AssaultRuneDrawer.runePaths[ 9],AssaultRuneDrawer.runePaths[15],AssaultRuneDrawer.runePaths[17],AssaultRuneDrawer.runePaths[24],AssaultRuneDrawer.runePaths[25],AssaultRuneDrawer.runePaths[21],AssaultRuneDrawer.runePaths[28],AssaultRuneDrawer.runePaths[30]] },                                                                                                                                                                                                                                                                    // ᛝ:ING
        DE   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 4],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[ 6],AssaultRuneDrawer.runePaths[13],AssaultRuneDrawer.runePaths[14],AssaultRuneDrawer.runePaths[10],AssaultRuneDrawer.runePaths[11],AssaultRuneDrawer.runePaths[22],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[23],AssaultRuneDrawer.runePaths[18],AssaultRuneDrawer.runePaths[20],AssaultRuneDrawer.runePaths[26],AssaultRuneDrawer.runePaths[27],AssaultRuneDrawer.runePaths[31]] },                                                                                                                                    // ᛞ:DAEG
        DF   :{ paths : [AssaultRuneDrawer.runePaths[12],AssaultRuneDrawer.runePaths[ 7],AssaultRuneDrawer.runePaths[ 9],AssaultRuneDrawer.runePaths[15],AssaultRuneDrawer.runePaths[17],AssaultRuneDrawer.runePaths[24],AssaultRuneDrawer.runePaths[25],AssaultRuneDrawer.runePaths[21],AssaultRuneDrawer.runePaths[28],AssaultRuneDrawer.runePaths[30]] },                                                                                                                                                                                                                                                                                                                                    // ᛟ:ETHEL
        E0   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[12],AssaultRuneDrawer.runePaths[ 7],AssaultRuneDrawer.runePaths[ 2],AssaultRuneDrawer.runePaths[ 9],AssaultRuneDrawer.runePaths[15],AssaultRuneDrawer.runePaths[11],AssaultRuneDrawer.runePaths[ 4],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[29]] },                                                                                                                                                                                                                                                                    // ᛠ:EAR<Unofficial>
        E1   :{ paths : [AssaultRuneDrawer.runePaths[ 2],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[ 6],AssaultRuneDrawer.runePaths[13],AssaultRuneDrawer.runePaths[14],AssaultRuneDrawer.runePaths[10],AssaultRuneDrawer.runePaths[18],AssaultRuneDrawer.runePaths[23],AssaultRuneDrawer.runePaths[20],AssaultRuneDrawer.runePaths[26],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[29]] },                                                                                                                                                                                                                                                                    // ᛡ:IOR<Unofficial>
        E2   :{ paths : [AssaultRuneDrawer.runePaths[27],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[17],AssaultRuneDrawer.runePaths[24],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[ 9],AssaultRuneDrawer.runePaths[15],AssaultRuneDrawer.runePaths[11],AssaultRuneDrawer.runePaths[ 4]] },                                                                                                                                                                                                                                                                                                                                    // ᛢ:CWEORTH<Unofficial>
        E3   :{ paths : [AssaultRuneDrawer.runePaths[ 2],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[28],AssaultRuneDrawer.runePaths[29],AssaultRuneDrawer.runePaths[30]] },                                                                                                                                                                                                                                                                                                                                                                                                                                                                    // ᛣ:CALC<Unofficial>
        E4   :{ paths : [AssaultRuneDrawer.runePaths[ 2],AssaultRuneDrawer.runePaths[ 8],AssaultRuneDrawer.runePaths[13],AssaultRuneDrawer.runePaths[ 6],AssaultRuneDrawer.runePaths[12],AssaultRuneDrawer.runePaths[17],AssaultRuneDrawer.runePaths[18],AssaultRuneDrawer.runePaths[19],AssaultRuneDrawer.runePaths[23],AssaultRuneDrawer.runePaths[14],AssaultRuneDrawer.runePaths[10],AssaultRuneDrawer.runePaths[15],AssaultRuneDrawer.runePaths[21],AssaultRuneDrawer.runePaths[20],AssaultRuneDrawer.runePaths[26],AssaultRuneDrawer.runePaths[29]] },                                                                                                                                    // ᛤ:CEALC<Unofficial>
        E5   :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 3],AssaultRuneDrawer.runePaths[ 4],AssaultRuneDrawer.runePaths[11],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[12],AssaultRuneDrawer.runePaths[ 7],AssaultRuneDrawer.runePaths[ 9],AssaultRuneDrawer.runePaths[15],AssaultRuneDrawer.runePaths[17],AssaultRuneDrawer.runePaths[24],AssaultRuneDrawer.runePaths[25],AssaultRuneDrawer.runePaths[21],AssaultRuneDrawer.runePaths[22],AssaultRuneDrawer.runePaths[31],AssaultRuneDrawer.runePaths[30],AssaultRuneDrawer.runePaths[16],AssaultRuneDrawer.runePaths[27],AssaultRuneDrawer.runePaths[28]] },    // ᛥ:STAN<Unofficial>
        E5_2 :{ paths : [AssaultRuneDrawer.runePaths[ 0],AssaultRuneDrawer.runePaths[ 1],AssaultRuneDrawer.runePaths[ 3],AssaultRuneDrawer.runePaths[ 4],AssaultRuneDrawer.runePaths[ 5],AssaultRuneDrawer.runePaths[11],AssaultRuneDrawer.runePaths[22],AssaultRuneDrawer.runePaths[31],AssaultRuneDrawer.runePaths[30],AssaultRuneDrawer.runePaths[28],AssaultRuneDrawer.runePaths[27],AssaultRuneDrawer.runePaths[16]] },                                                                                                                                                                                                                                                                    // ᛥ:SAN2<KUnofficial>
    }
    
    /* ᚠ:FEOH */
    static A0_FEOH = "A0";

    /* ᚢ:UR */
    static A2_UR = "A2";

    /* ᚣ:YR */
    static A3_YR = "A3";

    /* ᚦ:THORN */
    static A6_THORN = "A6";

    /* ᚨ:ANSUZ */
    static A8_ANSUZ = "A8";

    /* ᚩ:OS */
    static A9_OS = "A9";

    /* ᚪ:AC<Unofficial> */
    static AA_AC = "AA";

    /* ᚱ:REID */
    static B1_REID = "B1";

    /* ᚲ:KAUNA */
    static B2_KAUNA = "B2";

    /* ᚳ:CEN1 */
    static B3_CEN1 = "B3";

    /* ᚳ:CEN2 */
    static B3_2_CEN2 = "B3_2";

    /* ᚷ:GYFU */
    static B7_GYFU = "B7";

    /* ᚸ:GAR<Unofficial> */
    static B8_GAR = "B8";

    /* ᚹ:WYNN */
    static B9_WYNN = "B9";

    /* ᚻ:HAEGL<Unofficial> */
    static BB_HAEGL = "BB";

    /* ᚻ:HAEGL2<Unofficial> */
    static BB_2_HAEGL2 = "BB_2";

    /* ᚾ:NAUD */
    static BE_NAUD = "BE";

    /* ᛁ:ISS */
    static C1_ISS = "C1";

    /* ᛄ:GER */
    static C4_GER = "C4";

    /* ᛇ:YL<Unofficial> */
    static C7_YL = "C7";

    /* ᛈ:PEORTH */
    static C8_PEORTH = "C8";

    /* ᛉ:EOLHX */
    static C9_EOLHX = "C9";

    /* ᛋ:SIGEL */
    static CB_SIGEL = "CB";

    /* ᛋ:SIGEL2 */
    static CB_2_SIGEL2 = "CB_2";

    /* ᛏ:TYR */
    static CF_TYR = "CF";

    /* ᛒ:BEORC */
    static D2_BEORC = "D2";

    /* ᛖ:EH */
    static D6_EH = "D6";

    /* ᛗ:MAN */
    static D7_MAN = "D7";

    /* ᛚ:LOGR */
    static DA_LOGR = "DA";

    /* ᛝ:ING */
    static DD_ING = "DD";

    /* ᛞ:DAEG */
    static DE_DAEG = "DE";

    /* ᛟ:ETHEL */
    static DF_ETHEL = "DF";

    /* ᛠ:EAR<Unofficial> */
    static E0_EAR = "E0";

    /* ᛡ:IOR<Unofficial> */
    static E1_IOR = "E1";

    /* ᛢ:CWEORTH<Unofficial> */
    static E2_CWEORTH = "E2";

    /* ᛣ:CALC<Unofficial> */
    static E3_CALC = "E3";

    /* ᛤ:CEALC<Unofficial> */
    static E4_CEALC = "E4";

    /* ᛥ:STAN<Unofficial> */
    static E5_STAN = "E5";

    /* ᛥ:SAN2<Unofficial> */
    static E5_2_SAN2 = "E5_2";
    
    /** 横幅 */
    width = 100;
    
    /** 高さ */
    height = 100;

    /** ストローク色 */
    strokeColor = '';
    
    /** ストロークの太さ */
    strokeWidth = '';
    
    /** レイヤー配列 */
    layers = []
    
    /**
     * コンストラクタ
     */
    constructor() {
    }

    /**
     * オブジェクト生成(ルーン指定)
     */
    static createInstance1(rune) {
        let instance = new AssaultRuneDrawer();
        instance.layers.push(AssaultRuneLayer.createInstance1(rune));
        return instance;
    }

    /**
     * オブジェクト生成(ルーン2種指定)
     */
    static createInstance2(runeA, runeB) {
        let instance = new AssaultRuneDrawer();
        instance.layers.push(AssaultRuneLayer.createInstance1(runeA));
        instance.layers.push(AssaultRuneLayer.createInstance1(runeB));
        instance.setStrokeColorForAllLayer(instance.strokeColor);
        instance.setStrokeWidthForAllLayer(instance.strokeWidth);
        return instance;
    }

    /**
     * オブジェクト生成(ルーン2種指定 + ルーン統合)
     */
    static createInstance3(runeA, runeB, andMergeRuneLayer) {
        let instance = new AssaultRuneDrawer();
        instance.layers.push(AssaultRuneLayer.createInstance1(runeA));
        instance.layers.push(AssaultRuneLayer.createInstance1(runeB));
        instance.setStrokeColorForAllLayer(instance.strokeColor);
        instance.setStrokeWidthForAllLayer(instance.strokeWidth);
        
        // AND統合する場合And統合する
        if (andMergeRuneLayer) {
            let andLayer = this.createANDLayer(instance.layers[0], instance.layers[1]);
            instance.layers.push(andLayer);
        }
        
        return instance;
    }
    
    /**
     * AND統合レイヤ作成
     */
    static createANDLayer(layer1, layer2) {
        
        // まずは2つのレイヤで同一の線を抽出
        let andLayer = new AssaultRuneLayer();
        layer1.getPaths().paths.forEach(path1 => {
            
            // 2つ目のレイヤに同一の線が含まれていればAND統合レイヤに追加
            layer2.getPaths().paths.forEach(path2 => {
               if (path1 == path2) {                    // TODO : 参照判定ではなく内部判定にする
                   andLayer.paths.paths.push(path1);
               }
            });
        });
        
        // 2つのレイヤで同一頂点を抽出
        layer1.getPaths().paths.forEach(path1 => {
            [path1.from, path1.to].forEach(dot1 => {
            
                // 2つ目のレイヤに同一の点が含まれていればAND統合レイヤに追加
                layer2.getPaths().paths.forEach(path2 => {
                    [path2.from, path2.to].forEach(dot2 => {
                    
                        // 同一点であればAND統合レイヤに追加
                        if (dot1 == dot2) {                      // TODO : 参照判定ではなく内部判定にする
                            andLayer.paths.paths.push({ from : dot1, to : dot1, });
                        }
                    });
                });
            });
        });
        
        // 構築したインスタンスを返却
        return andLayer;
    }
    
    /**
     * 全レイヤにstrokeColorを適用
     */
    setStrokeColorForAllLayer(strokeColor) {
        this.layers.forEach(layer => {
            layer.strokeColor = strokeColor;
        });
    }
    
    /**
     * 全レイヤにstrokeWidthを適用
     */
    setStrokeWidthForAllLayer(strokeWidth) {
        this.layers.forEach(layer => {
            layer.strokeWidth = strokeWidth;
        });
    }
    
    /**
     * 現在のレイヤ構成でSnap.svgオブジェクトを生成
     */
    drawSVGElement(query) {
        
        // Snap.svgオブジェクトを生成全レイヤの全パスを描画
        let elements = document.querySelectorAll(query);
        elements.forEach(element => {
            //element.viewBox = "0 0 " + this.width + " " + this.height;
            element.setAttribute("viewBox", "0 0 " + this.width + " " + this.height);
        });
        let snapSvg = Snap(query);
        snapSvg.clear();
        this.drawingToSnapSvg(snapSvg);
        return snapSvg;
    }
    
    /**
     * 現在のレイヤ構成でSnap.svgオブジェクトを生成
     */
    createSnapSVGObject1() {
        
        // Snap.svgオブジェクトを生成全レイヤの全パスを描画
        let snapSvg = Snap(this.width, this.height);
        snapSvg.clear();
        this.drawingToSnapSvg(snapSvg);
        return snapSvg;
    }
    
    /**
     * Snap.svg描画
     */
    drawingToSnapSvg(snapSvg) {
        this.layers.forEach(layer => {
            layer.getPaths().paths.forEach(path => {
                
                // ライン作成
                let lineEle = snapSvg.line(path.from.x,
                                           path.from.y,
                                           path.to.x,
                                           path.to.y);
                
                // ラインの属性(ストロークの太さ＋色)設定
                lineEle.attr({
                    'stroke':         layer.strokeColor,
                    'strokeWidth':    layer.strokeWidth,
                    'stroke-linecap': 'round',
                });
            });
        });
    }
    
    /**
     * DataURL構築
     */
    toDataURL() {
        let snapSvg = this.createSnapSVGObject1();
        return snapSvg.toDataURL();
    }
}

/**
 * ルーン描画／レイヤ
 */
class AssaultRuneLayer {

    /** ストローク色 */
    strokeColor = '';
    
    /** ストロークの太さ */
    strokeWidth = '';
    
    /** パス一覧 */
    paths = { paths : [] };
    
    /** 反転フラグ */
    mirror = false;
    
    /**
     * コンストラクタ
     */
    constructor() {
    }
    
    /**
     * コンストラクタ
     */
    static createInstance1(rune) {
        let instance = new AssaultRuneLayer();
        instance.paths = AssaultRuneDrawer.runes[rune];
        return instance;
    }
    
    /**
     * コンストラクタ
     */
    static createInstance2(strokeColor, strokeWidth, rune) {
        let instance = new AssaultRuneLayer();
        instance.strokeColor = strokeColor;
        instance.strokeWidth = strokeWidth;
        instance.paths       = AssaultRuneDrawer.runes[rune];
        return instance;
    }
    
    /**
     * パス取得
     */
    getPaths() {
        
        // ミラーでない場合そのまま返却
        if (!this.mirror) {
            return this.paths;
        }
        
        // ミラーの場合 ミラー化した配列を返却
        let mirrorPaths = { paths : [] };
        this.paths.paths.forEach(path => {
            
            // ミラー化関数にてミラーに置換
            let descPath = this.copyPath(path);
            descPath.from.x = this.dotMirror(descPath.from.x);
            descPath.to.x   = this.dotMirror(descPath.to.x);
            mirrorPaths.paths.push(descPath);
        });
        return mirrorPaths;
    }
    
    /**
     * pathコピー
     */
    copyPath(source) {
        
        // pathをコピー
        return {
                from : { x:source.from.x, y:source.from.y, },
                to   : { x:source.to.x,   y:source.to.y,   },
               };
    }
    
    /**
     * 頂点を反転させる
     */
    dotMirror(column) {
        
        // ミラーでない場合そのまま返却
        if (!this.mirror) {
            return dot;
        }
        
        // ミラーの場合 反転座標に読み替える
        if (column == AssaultRuneDrawer.columns.colA) {
            return AssaultRuneDrawer.columns.colE;
        }
        if (column == AssaultRuneDrawer.columns.colB) {
            return AssaultRuneDrawer.columns.colD;
        }
        if (column == AssaultRuneDrawer.columns.colD) {
            return AssaultRuneDrawer.columns.colB;
        }
        if (column == AssaultRuneDrawer.columns.colE) {
            return AssaultRuneDrawer.columns.colA;
        }
        return column;
    }
    
}


