// ============================================
// CFOP 公式数据 - 中文表示
// ============================================
// 符号说明：
// 上=U面, 下=D面, 左=L面, 右=R面, 前=F面, 后=B面
// 顺=顺时针90°, 逆=逆时针90°, 双=180°
// 中=M层(左右之间), 赤=E层(上下之间)

const FORMULAS = {
  cross: [
    { id:'CR-1', name:'底层十字-基础1', desc:'白色棱块在顶层对面', algo:'上顺 上顺 前双' },
    { id:'CR-2', name:'底层十字-基础2', desc:'白色棱块在顶层', algo:'前双' },
    { id:'CR-3', name:'底层十字-基础3', desc:'白色棱块在前面右侧', algo:'上逆 右逆 前顺 右顺' },
    { id:'CR-4', name:'底层十字-基础4', desc:'白色棱块在前面左侧', algo:'上顺 左顺 前逆 左逆' },
    { id:'CR-5', name:'底层十字-基础5', desc:'白色棱块在右面', algo:'右逆 前逆 上逆 前顺' },
    { id:'CR-6', name:'底层十字-基础6', desc:'白色棱块在左面', algo:'左顺 前顺 上顺 前逆' },
    { id:'CR-7', name:'底层十字-基础7', desc:'白色棱块在中层前右', algo:'前顺' },
    { id:'CR-8', name:'底层十字-基础8', desc:'白色棱块在中层前左', algo:'前逆' },
    { id:'CR-9', name:'底层十字-基础9', desc:'白色棱块在底层反向', algo:'前双 上顺 右顺 前逆 右逆' },
    { id:'CR-10', name:'底层十字-基础10', desc:'白色棱块在底面位置正确但翻转', algo:'前顺 右顺 上顺 右逆 前双' },
  ],

  f2l: [
    { id:'F2L-1', name:'F2L-1 基础插入', desc:'角块和棱块都在顶层，白色朝右', algo:'上顺 右顺 上逆 右逆' },
    { id:'F2L-2', name:'F2L-2 基础插入', desc:'角块和棱块都在顶层，白色朝前', algo:'上逆 前逆 上顺 前顺' },
    { id:'F2L-3', name:'F2L-3 角块白朝上', desc:'角在顶层白朝上，棱在顶层', algo:'上顺 右顺 上逆 右逆 上逆 前逆 上顺 前顺' },
    { id:'F2L-4', name:'F2L-4 角块白朝前', desc:'角在顶层白朝前方', algo:'前逆 上顺 前顺' },
    { id:'F2L-5', name:'F2L-5 角块白朝右', desc:'角在顶层白朝右方', algo:'右顺 上逆 右逆' },
    { id:'F2L-6', name:'F2L-6 配对后插入', desc:'角和棱分离需先配对', algo:'上逆 右顺 上顺 右逆 上顺 右顺 上逆 右逆' },
    { id:'F2L-7', name:'F2L-7 棱在位角在顶', desc:'棱已在位但角在顶层', algo:'右顺 上逆 右逆 上双 右顺 上逆 右逆' },
    { id:'F2L-8', name:'F2L-8 角在位棱在顶', desc:'角已在位但棱在顶层', algo:'上顺 右顺 上逆 右逆 上逆 右顺 上顺 右逆' },
    { id:'F2L-9', name:'F2L-9 角棱已配对', desc:'角和棱已配对在顶层', algo:'右顺 上逆 右逆' },
    { id:'F2L-10', name:'F2L-10 角棱反向配对', desc:'角和棱在顶层但方向相反', algo:'上顺 右顺 上双 右逆 上顺 右顺 上逆 右逆' },
    { id:'F2L-11', name:'F2L-11', desc:'角在底层方向错误', algo:'右顺 上逆 右逆 上顺 右顺 上逆 右逆' },
    { id:'F2L-12', name:'F2L-12', desc:'角在槽中方向错误', algo:'右顺 上顺 右逆 上逆 右顺 上顺 右逆' },
    { id:'F2L-13', name:'F2L-13', desc:'棱在槽中方向错误', algo:'右顺 上逆 右逆 前逆 上顺 前顺' },
    { id:'F2L-14', name:'F2L-14', desc:'角和棱都在槽中都错误', algo:'右顺 上逆 右逆 上顺 前逆 上逆 前顺' },
    { id:'F2L-15', name:'F2L-15 镜像1', desc:'镜像基础插入1', algo:'上逆 左逆 上顺 左顺' },
    { id:'F2L-16', name:'F2L-16 镜像2', desc:'镜像基础插入2', algo:'上顺 前顺 上逆 前逆' },
    { id:'F2L-17', name:'F2L-17', desc:'顶层角棱同色相邻', algo:'右顺 上双 右逆 上逆 右顺 上顺 右逆' },
    { id:'F2L-18', name:'F2L-18', desc:'顶层角棱分离对面', algo:'上双 右顺 上顺 右逆 上顺 右顺 上逆 右逆' },
    { id:'F2L-19', name:'F2L-19', desc:'角白朝上棱需翻转', algo:'右顺 上逆 右逆 上双 前逆 上顺 前顺' },
    { id:'F2L-20', name:'F2L-20', desc:'角白朝上棱色不对', algo:'上双 右顺 上逆 右逆 上逆 前逆 上顺 前顺' },
    { id:'F2L-21', name:'F2L-21', desc:'角在顶白朝右棱在顶', algo:'右顺 上顺 右逆 上逆 右顺 上顺 右逆' },
    { id:'F2L-22', name:'F2L-22', desc:'角在顶白朝前棱在顶', algo:'前逆 上逆 前顺 上顺 前逆 上逆 前顺' },
    { id:'F2L-23', name:'F2L-23', desc:'顶层分离同侧', algo:'上逆 右顺 上双 右逆 上双 右顺 上逆 右逆' },
    { id:'F2L-24', name:'F2L-24', desc:'顶层分离异侧', algo:'上顺 前逆 上双 前顺 上双 前逆 上顺 前顺' },
    { id:'F2L-25', name:'F2L-25', desc:'角在底正确棱在顶', algo:'上顺 右顺 上逆 右逆 上顺 右顺 上逆 右逆' },
    { id:'F2L-26', name:'F2L-26', desc:'角在底翻转棱在顶', algo:'上逆 前逆 上顺 前顺 上逆 前逆 上顺 前顺' },
    { id:'F2L-27', name:'F2L-27', desc:'角在底正确棱反向', algo:'右顺 上逆 右逆 上顺 前逆 上逆 前顺' },
    { id:'F2L-28', name:'F2L-28', desc:'角在底棱在中层', algo:'右顺 上顺 右逆 上逆 右顺 上顺 右逆' },
    { id:'F2L-29', name:'F2L-29', desc:'角棱都在位但角翻转', algo:'右顺 上逆 右逆 前逆 上双 前顺 上顺 前逆 上顺 前顺' },
    { id:'F2L-30', name:'F2L-30', desc:'角棱都在位但棱翻转', algo:'右顺 上顺 右逆 上逆 右顺 上逆 右逆 上双 前逆 上顺 前顺' },
    { id:'F2L-31', name:'F2L-31', desc:'角正确棱翻转在槽中', algo:'右顺 上双 右逆 上逆 右顺 上逆 右逆 前逆 上双 前顺 上顺 前逆 上顺 前顺' },
    { id:'F2L-32', name:'F2L-32', desc:'角棱互换位置', algo:'右顺 上逆 右逆 上顺 右顺 上逆 右逆' },
    { id:'F2L-33', name:'F2L-33', desc:'角在槽棱在顶层', algo:'上逆 右顺 上顺 右逆 上逆 右顺 上顺 右逆' },
    { id:'F2L-34', name:'F2L-34', desc:'角向右棱配对', algo:'上顺 右顺 上逆 右逆 前逆 上逆 前顺' },
    { id:'F2L-35', name:'F2L-35', desc:'角向前棱配对反方向', algo:'上逆 前逆 上顺 前顺 右顺 上顺 右逆' },
    { id:'F2L-36', name:'F2L-36', desc:'同色面对面', algo:'前逆 上顺 前顺 上双 前逆 上逆 前顺' },
    { id:'F2L-37', name:'F2L-37', desc:'异色面对面', algo:'右顺 上逆 右逆 上双 右顺 上顺 右逆' },
    { id:'F2L-38', name:'F2L-38', desc:'棱在对面槽角在顶', algo:'右顺 上逆 右逆 上逆 前逆 上顺 前顺' },
    { id:'F2L-39', name:'F2L-39', desc:'棱翻转在位角在顶白朝上', algo:'右顺 上双 右双 上逆 右顺 上逆 右逆 上双 前逆 上顺 前顺' },
    { id:'F2L-40', name:'F2L-40', desc:'角在后槽需调出', algo:'右顺 上顺 右逆 上双 右顺 上逆 右逆' },
    { id:'F2L-41', name:'F2L-41', desc:'最终情况复合调整', algo:'右顺 上双 右逆 上逆 右顺 上顺 右逆 上逆 右顺 上逆 右逆' },
  ],

  oll: [
    { id:'OLL-1', name:'OLL-1 十字', desc:'仅中心朝上', algo:'右顺 上双 右双 前顺 右顺 前逆 上双 右双 上双 右顺' },
    { id:'OLL-2', name:'OLL-2 十字', desc:'仅中心朝上(另一种)', algo:'前顺 右顺 上顺 右逆 上逆 前逆 前顺 右顺 上顺 右逆 上逆 前逆' },
    { id:'OLL-3', name:'OLL-3', desc:'L形朝左', algo:'前顺 右顺 上顺 右逆 上逆 前逆 上顺 前顺 右顺 上顺 右逆 上逆 前逆' },
    { id:'OLL-4', name:'OLL-4', desc:'L形朝右', algo:'前顺 右顺 上顺 右逆 上逆 前逆 上逆 前顺 右顺 上顺 右逆 上逆 前逆' },
    { id:'OLL-5', name:'OLL-5', desc:'方块左', algo:'右逆 前双 右顺 上顺 右逆 前顺 右顺 前逆 上逆 前逆' },
    { id:'OLL-6', name:'OLL-6', desc:'方块右', algo:'前双 右逆 前逆 右顺 前逆 右双 上顺 右逆 上逆 前顺' },
    { id:'OLL-7', name:'OLL-7', desc:'小L左下', algo:'右顺 上顺 右逆 上顺 右顺 上双 右逆 前顺 右顺 上顺 右逆 上逆 前逆' },
    { id:'OLL-8', name:'OLL-8', desc:'小L右下', algo:'前顺 右顺 上顺 右逆 上逆 前逆 左逆 上逆 左顺 上逆 左逆 上双 左顺' },
    { id:'OLL-9', name:'OLL-9', desc:'鱼形左', algo:'右顺 上顺 右逆 上逆 右逆 前顺 右双 上顺 右逆 上逆 前逆' },
    { id:'OLL-10', name:'OLL-10', desc:'鱼形右', algo:'右顺 上顺 右逆 上顺 右逆 前顺 右顺 前逆 右顺 上双 右逆' },
    { id:'OLL-11', name:'OLL-11', desc:'两角相邻朝上', algo:'右双 上顺 右逆 后逆 右顺 上逆 右双 上顺 后顺 右逆' },
    { id:'OLL-12', name:'OLL-12', desc:'两角对角朝上', algo:'前顺 右顺 上顺 右逆 上逆 前逆 右顺 上顺 右逆 上逆 右逆 前顺 右顺 前逆' },
    { id:'OLL-13', name:'OLL-13', desc:'骑士左', algo:'前顺 上顺 右顺 上逆 右双 前逆 右顺 上顺 右顺 上逆 右逆' },
    { id:'OLL-14', name:'OLL-14', desc:'骑士右', algo:'右逆 前顺 右顺 后逆 右逆 前逆 右顺 后顺' },
    { id:'OLL-15', name:'OLL-15', desc:'箭头上', algo:'左逆 后逆 左顺 右逆 上逆 右顺 上顺 左逆 后顺 左顺' },
    { id:'OLL-16', name:'OLL-16', desc:'箭头下', algo:'右顺 后顺 右逆 左顺 上顺 左逆 上逆 右顺 后逆 右逆' },
    { id:'OLL-17', name:'OLL-17', desc:'一字形', algo:'右顺 上顺 右逆 上顺 右顺 上双 右逆' },
    { id:'OLL-18', name:'OLL-18', desc:'点形4角', algo:'右顺 上双 右双 上逆 右顺 上逆 右逆 上双 前顺 右顺 前逆' },
    { id:'OLL-19', name:'OLL-19', desc:'点形对角', algo:'右顺 上双 右双 前顺 右顺 前逆 上双 前顺 右顺 前逆' },
    { id:'OLL-20', name:'OLL-20 全朝上', desc:'顶面纯色', algo:'右顺 上顺 右逆 上顺 右顺 上逆 右逆 上逆 右逆 前顺 右顺 前逆' },
    { id:'OLL-21', name:'OLL-21', desc:'十字对角', algo:'右顺 上双 右逆 上逆 右顺 上逆 右逆' },
    { id:'OLL-22', name:'OLL-22', desc:'十字四角朝上', algo:'右顺 上双 右双 上逆 右双 上逆 右双 上双 右顺' },
    { id:'OLL-23', name:'OLL-23', desc:'十字相邻角', algo:'右双 上顺 右逆 后逆 右顺 上逆 右双 上顺 后顺 右逆' },
    { id:'OLL-24', name:'OLL-24', desc:'十字一角', algo:'右顺 上顺 右逆 上逆 右逆 前顺 右顺 前逆' },
    { id:'OLL-25', name:'OLL-25', desc:'十字另一角', algo:'前逆 右逆 前顺 右顺 上顺 右顺 上逆 右逆' },
    { id:'OLL-26', name:'OLL-26', desc:'S形', algo:'右顺 上双 右逆 上逆 右顺 上逆 右逆' },
    { id:'OLL-27', name:'OLL-27', desc:'反S形', algo:'右顺 上顺 右逆 上顺 右顺 上双 右逆' },
    { id:'OLL-28', name:'OLL-28', desc:'线段加角', algo:'右顺 上顺 右逆 上逆 前逆 右逆 前顺 右双 上顺 右逆 上逆' },
    { id:'OLL-29', name:'OLL-29', desc:'角加一线', algo:'右顺 右顺 上顺 右顺 上顺 右逆 上逆 右逆 上逆 右逆 上顺 右逆' },
    { id:'OLL-30', name:'OLL-30', desc:'角加一线', algo:'右逆 上逆 右顺 上逆 右逆 上双 右顺' },
    { id:'OLL-31', name:'OLL-31', desc:'P形左', algo:'右顺 上逆 前逆 上顺 前顺 右逆' },
    { id:'OLL-32', name:'OLL-32', desc:'P形右', algo:'左逆 上顺 前顺 上逆 前逆 左顺' },
    { id:'OLL-33', name:'OLL-33', desc:'T形', algo:'右顺 上顺 右逆 上逆 右逆 前顺 右顺 前逆' },
    { id:'OLL-34', name:'OLL-34', desc:'C形', algo:'前顺 右顺 上顺 右逆 上逆 前逆 上顺 前顺 右顺 上顺 右逆 上逆 前逆' },
    { id:'OLL-35', name:'OLL-35', desc:'鱼形', algo:'右顺 上双 右双 前顺 右顺 前逆 右顺 上双 右逆' },
    { id:'OLL-36', name:'OLL-36', desc:'W形左', algo:'左逆 上逆 左顺 上逆 左逆 上双 左顺' },
    { id:'OLL-37', name:'OLL-37', desc:'鱼形大', algo:'前顺 右顺 上逆 右逆 上逆 右顺 上顺 右逆 前逆' },
    { id:'OLL-38', name:'OLL-38', desc:'W形右', algo:'右顺 上顺 右逆 上顺 右顺 上双 右逆' },
    { id:'OLL-39', name:'OLL-39', desc:'大L左', algo:'左顺 前顺 右逆 前逆 左逆 前顺 右顺 前逆' },
    { id:'OLL-40', name:'OLL-40', desc:'大L右', algo:'右逆 前顺 左顺 前逆 右顺 前顺 左逆 前逆' },
    { id:'OLL-41', name:'OLL-41', desc:'E形', algo:'右顺 上顺 右逆 上顺 右顺 上双 右逆 前顺 右顺 上顺 右逆 上逆 前逆' },
    { id:'OLL-42', name:'OLL-42', desc:'反E形', algo:'右逆 上逆 右顺 上逆 右逆 上双 右顺 前逆 左逆 上逆 左顺 上顺 前顺' },
    { id:'OLL-43', name:'OLL-43', desc:'十字反P', algo:'前顺 上顺 右顺 上逆 右逆 前逆' },
    { id:'OLL-44', name:'OLL-44', desc:'十字P形', algo:'前顺 上顺 右顺 上逆 右逆 上顺 右顺 上逆 右逆 前逆' },
    { id:'OLL-45', name:'OLL-45', desc:'T形十字', algo:'前顺 右顺 上顺 右逆 上逆 前逆' },
    { id:'OLL-46', name:'OLL-46', desc:'S形十字', algo:'右逆 上逆 右逆 前顺 右顺 前逆 上顺 右顺' },
    { id:'OLL-47', name:'OLL-47', desc:'反L十字', algo:'右逆 上逆 右逆 前顺 右顺 前逆 右逆 前顺 右顺 前逆 上顺 右顺' },
    { id:'OLL-48', name:'OLL-48', desc:'线形十字', algo:'前顺 右顺 上顺 右逆 上逆 右顺 上顺 右逆 上逆 前逆' },
    { id:'OLL-49', name:'OLL-49', desc:'I形左', algo:'右顺 后顺 右逆 上逆 右逆 后逆 右顺 右顺 上顺 右逆 上逆' },
    { id:'OLL-50', name:'OLL-50', desc:'I形右', algo:'右逆 前顺 右顺 上顺 右逆 前逆 右顺 前顺 上逆 前逆' },
    { id:'OLL-51', name:'OLL-51', desc:'一字形2', algo:'前顺 上顺 右顺 上逆 右逆 上顺 右顺 上逆 右逆 前逆' },
    { id:'OLL-52', name:'OLL-52', desc:'一字L', algo:'右顺 上顺 右逆 上顺 右逆 前顺 右顺 前逆 上双 右逆 前顺 右顺 前逆' },
    { id:'OLL-53', name:'OLL-53', desc:'一字T', algo:'左逆 后逆 左顺 右逆 上逆 右顺 上顺 左逆 后顺 左顺' },
    { id:'OLL-54', name:'OLL-54', desc:'一字S', algo:'右顺 后顺 右逆 左顺 上顺 左逆 上逆 右顺 后逆 右逆' },
    { id:'OLL-55', name:'OLL-55', desc:'高速公路', algo:'右顺 上双 右双 上逆 右顺 上逆 右逆 上双 前顺 右顺 前逆' },
    { id:'OLL-56', name:'OLL-56', desc:'闪电', algo:'右顺 上顺 右逆 上顺 左逆 上顺 右顺 上逆 右逆 左顺' },
    { id:'OLL-57', name:'OLL-57', desc:'H形', algo:'右顺 上顺 右逆 上逆 右逆 前顺 右逆 前逆 右顺 右顺' },
  ],

  pll: [
    { id:'PLL-Aa', name:'PLL-Aa 邻角换', desc:'A排列(顺时针三角换)', algo:'右逆 前顺 右逆 后双 右顺 前逆 右逆 后双 右双' },
    { id:'PLL-Ab', name:'PLL-Ab 邻角换', desc:'A排列(逆时针三角换)', algo:'右双 后双 右顺 前顺 右逆 后双 右顺 前逆 右顺' },
    { id:'PLL-E', name:'PLL-E 对角换', desc:'E排列(四角互换)', algo:'右顺 后逆 右逆 前顺 右顺 后顺 右逆 前逆 右顺 后顺 右逆 前顺 右顺 后逆 右逆 前逆' },
    { id:'PLL-Ua', name:'PLL-Ua 三棱换', desc:'U排列(顺时针三棱换)', algo:'右双 上逆 右逆 上逆 右顺 上顺 右顺 上顺 右顺 上逆 右顺' },
    { id:'PLL-Ub', name:'PLL-Ub 三棱换', desc:'U排列(逆时针三棱换)', algo:'右逆 上顺 右逆 上逆 右逆 上逆 右逆 上顺 右顺 上顺 右双' },
    { id:'PLL-H', name:'PLL-H 对棱换', desc:'H排列(对面棱互换)', algo:'右双 左双 下顺 右双 左双 上双 右双 左双 下顺 右双 左双' },
    { id:'PLL-Z', name:'PLL-Z 邻棱换', desc:'Z排列(相邻棱互换)', algo:'右逆 上逆 右顺 上逆 右顺 上顺 右顺 上顺 右逆 上顺 右顺 上双 右逆 上双' },
    { id:'PLL-T', name:'PLL-T 型', desc:'T排列', algo:'右顺 上顺 右逆 上逆 右逆 前顺 右双 上逆 右逆 上逆 右顺 上顺 右逆 前逆' },
    { id:'PLL-F', name:'PLL-F 型', desc:'F排列', algo:'右逆 上逆 前逆 右顺 上顺 右逆 上逆 右逆 前顺 右双 上逆 右逆 上顺 右顺 上顺 右逆 上顺 右顺' },
    { id:'PLL-Ja', name:'PLL-Ja 型', desc:'J排列(a)', algo:'右逆 左逆 上双 右顺 左顺 上逆 右逆 左逆 上双 右顺 左顺' },
    { id:'PLL-Jb', name:'PLL-Jb 型', desc:'J排列(b)', algo:'右顺 上顺 右逆 前逆 右顺 上顺 右逆 上逆 右逆 前顺 右双 上逆 右逆' },
    { id:'PLL-Ra', name:'PLL-Ra 型', desc:'R排列(a)', algo:'左顺 上双 左逆 上双 左顺 前逆 左逆 上逆 左顺 上顺 左顺 前顺 左双' },
    { id:'PLL-Rb', name:'PLL-Rb 型', desc:'R排列(b)', algo:'右逆 上双 右顺 上双 右逆 前顺 右顺 上顺 右逆 上逆 右逆 前逆 右双' },
    { id:'PLL-Y', name:'PLL-Y 型', desc:'Y排列', algo:'前顺 右顺 上逆 右逆 上逆 右顺 上顺 右逆 前逆 右顺 上顺 右逆 上逆 右逆 前顺 右顺 前逆' },
    { id:'PLL-V', name:'PLL-V 型', desc:'V排列', algo:'右逆 上顺 右逆 上逆 后逆 右逆 后双 上逆 后逆 上顺 后逆 右顺 后顺 右顺' },
    { id:'PLL-Na', name:'PLL-Na 型', desc:'N排列(a)', algo:'右顺 上顺 右逆 上顺 右顺 上顺 右逆 前逆 右顺 上顺 右逆 上逆 右逆 前顺 右双 上逆 右逆 上双 右顺 上逆 右逆' },
    { id:'PLL-Nb', name:'PLL-Nb 型', desc:'N排列(b)', algo:'右逆 上逆 右顺 上逆 右逆 上逆 右顺 前顺 右逆 上逆 右顺 上顺 右顺 前逆 右双 上顺 右顺 上双 右逆 上顺 右顺' },
    { id:'PLL-Ga', name:'PLL-Ga 型', desc:'G排列(a)', algo:'右双 上顺 右逆 上顺 右逆 上逆 右顺 上逆 右双 上逆 下顺 右逆 上顺 右顺 下逆' },
    { id:'PLL-Gb', name:'PLL-Gb 型', desc:'G排列(b)', algo:'右逆 上逆 右顺 上顺 下逆 右双 上顺 右逆 上顺 右顺 上逆 右顺 上逆 右双 下顺' },
    { id:'PLL-Gc', name:'PLL-Gc 型', desc:'G排列(c)', algo:'右双 上逆 右顺 上逆 右顺 上顺 右逆 上顺 右双 上顺 下逆 右顺 上逆 右逆 下顺' },
    { id:'PLL-Gd', name:'PLL-Gd 型', desc:'G排列(d)', algo:'右顺 上顺 右逆 上逆 下顺 右双 上逆 右顺 上逆 右逆 上顺 右逆 上顺 右双 下逆' },
  ],

  zbll: [
    { id:'ZBLL-T1', name:'ZBLL-T1', desc:'T形顶面-三棱换顺', algo:'右顺 上顺 右逆 上逆 右逆 前顺 右双 上逆 右逆 上逆 右顺 上顺 右逆 前逆' },
    { id:'ZBLL-T2', name:'ZBLL-T2', desc:'T形顶面-三棱换逆', algo:'前顺 右顺 上逆 右逆 上逆 右顺 上顺 右逆 前逆 右顺 上顺 右逆 上逆 右逆 前顺 右顺 前逆' },
    { id:'ZBLL-T3', name:'ZBLL-T3', desc:'T形顶面-对角换', algo:'右顺 上逆 右逆 上双 右顺 上逆 右逆 上双 左逆 上顺 左顺' },
    { id:'ZBLL-T4', name:'ZBLL-T4', desc:'T形顶面-邻角换', algo:'右顺 上顺 右逆 上逆 后逆 右顺 上顺 右逆 上逆 后顺' },
    { id:'ZBLL-U1', name:'ZBLL-U1', desc:'U形顶面-全对', algo:'右双 上顺 右顺 上顺 右逆 上逆 右逆 上逆 右逆 上顺 右逆' },
    { id:'ZBLL-U2', name:'ZBLL-U2', desc:'U形顶面-二换', algo:'右顺 上双 右逆 上逆 右顺 上逆 右逆 上逆 左逆 上顺 左顺 上逆' },
    { id:'ZBLL-U3', name:'ZBLL-U3', desc:'U形顶面-三换顺', algo:'左逆 上逆 左顺 上逆 左逆 上双 左顺 上顺 右顺 上顺 右逆' },
    { id:'ZBLL-U4', name:'ZBLL-U4', desc:'U形顶面-三换逆', algo:'右顺 上顺 右逆 上顺 右顺 上双 右逆 上逆 左逆 上逆 左顺' },
    { id:'ZBLL-L1', name:'ZBLL-L1', desc:'L形顶面-邻换', algo:'右顺 上双 右逆 上逆 右顺 上逆 右逆 前逆 右顺 上顺 右逆 上逆 右逆 前顺 右顺' },
    { id:'ZBLL-L2', name:'ZBLL-L2', desc:'L形顶面-对换', algo:'右顺 上逆 右逆 前逆 左逆 上逆 左顺 上顺 前顺 右顺 上顺 右逆' },
    { id:'ZBLL-H1', name:'ZBLL-H1', desc:'H形顶面-对棱换', algo:'右顺 上顺 右逆 上逆 右逆 前顺 右顺 上顺 右顺 上逆 右逆 前逆 右双 上逆 右逆' },
    { id:'ZBLL-H2', name:'ZBLL-H2', desc:'H形顶面-邻棱换', algo:'前顺 右顺 上逆 右逆 上顺 右顺 上顺 右逆 上逆 前逆 右顺 上顺 右逆 上逆 右逆 前顺 右顺 前逆' },
    { id:'ZBLL-S1', name:'ZBLL-S1', desc:'S形顶面-1', algo:'右顺 上顺 右逆 上顺 右顺 上双 右逆 前顺 右顺 上顺 右逆 上逆 前逆' },
    { id:'ZBLL-S2', name:'ZBLL-S2', desc:'S形顶面-2', algo:'左逆 上逆 左顺 上逆 左逆 上双 左顺 前逆 左逆 上逆 左顺 上顺 前顺' },
    { id:'ZBLL-AS1', name:'ZBLL-AS1', desc:'反S形顶面-1', algo:'右顺 上双 右逆 上逆 右顺 上逆 右逆 上顺 右顺 上顺 右逆 后逆 右顺 上顺 右逆 后顺' },
    { id:'ZBLL-AS2', name:'ZBLL-AS2', desc:'反S形顶面-2', algo:'左逆 上双 左顺 上顺 左逆 上顺 左顺 上逆 左逆 上逆 左顺 后顺 左逆 上逆 左顺 后逆' },
    { id:'ZBLL-Pi1', name:'ZBLL-Pi1', desc:'Pi形顶面-1', algo:'右顺 上双 右双 上逆 右双 上逆 右双 上双 右顺' },
    { id:'ZBLL-Pi2', name:'ZBLL-Pi2', desc:'Pi形顶面-2', algo:'前顺 右顺 上顺 右逆 上逆 右顺 上顺 右逆 上逆 前逆' },
  ],

  zbls: [
    { id:'ZBLS-1', name:'ZBLS-1 基础', desc:'角块白朝右，棱块颜色对齐', algo:'右顺 上顺 右逆 上逆 右顺 上顺 右逆' },
    { id:'ZBLS-2', name:'ZBLS-2', desc:'角块白朝前，棱块需翻转', algo:'上逆 前逆 上顺 前顺 前逆 上逆 前顺' },
    { id:'ZBLS-3', name:'ZBLS-3', desc:'角块白朝上，棱在位', algo:'右顺 上双 右逆 上逆 右顺 上逆 右逆 上顺 前逆 上逆 前顺' },
    { id:'ZBLS-4', name:'ZBLS-4', desc:'角在顶棱在右', algo:'上顺 右顺 上双 右逆 上顺 右顺 上逆 右逆' },
    { id:'ZBLS-5', name:'ZBLS-5', desc:'角在顶棱在前', algo:'上逆 前逆 上双 前顺 上逆 前逆 上顺 前顺' },
    { id:'ZBLS-6', name:'ZBLS-6', desc:'角棱同色朝上', algo:'右顺 上顺 右逆 上逆 前逆 上顺 前顺 右顺 上逆 右逆' },
    { id:'ZBLS-7', name:'ZBLS-7', desc:'角棱配对需翻转', algo:'上逆 右顺 上顺 右逆 上逆 右顺 上双 右逆' },
    { id:'ZBLS-8', name:'ZBLS-8', desc:'角棱分离在对面', algo:'右顺 上双 右逆 上顺 前逆 上逆 前顺' },
    { id:'ZBLS-9', name:'ZBLS-9', desc:'OLL skip 导向1', algo:'右顺 上逆 右逆 上双 右顺 上逆 右逆 前逆 上顺 前顺' },
    { id:'ZBLS-10', name:'ZBLS-10', desc:'OLL skip 导向2', algo:'上顺 右顺 上逆 右逆 上顺 右顺 上双 右逆 上顺 前逆 上逆 前顺' },
    { id:'ZBLS-11', name:'ZBLS-11', desc:'角棱均错位', algo:'前逆 右顺 上顺 右逆 上逆 右顺 上顺 右逆 前顺' },
    { id:'ZBLS-12', name:'ZBLS-12', desc:'角棱互换需调整', algo:'右顺 上逆 右逆 上顺 右顺 上逆 右逆 前逆 右顺 上顺 右逆 前顺' },
  ],

  cross2f2l: [
    { id:'C2F-1', name:'十字→F2L 过渡1', desc:'做完十字，角在顶层白朝右', algo:'上顺 右顺 上逆 右逆' },
    { id:'C2F-2', name:'十字→F2L 过渡2', desc:'做完十字，角在顶层白朝前', algo:'上逆 前逆 上顺 前顺' },
    { id:'C2F-3', name:'十字→F2L 过渡3', desc:'做完十字，角在顶层白朝上', algo:'前逆 上逆 前顺 上双 右顺 上顺 右逆' },
    { id:'C2F-4', name:'十字→F2L 过渡4', desc:'角在底层位置错误', algo:'右顺 上顺 右逆 上逆 (重复至角到顶层后归位)' },
    { id:'C2F-5', name:'十字→F2L 过渡5', desc:'角在底层方向错误', algo:'右顺 上顺 右逆 上逆 右顺 上顺 右逆' },
    { id:'C2F-6', name:'十字→F2L 过渡6', desc:'同时处理角和棱', algo:'上双 右顺 上顺 右逆 上顺 右顺 上逆 右逆' },
    { id:'C2F-7', name:'十字→F2L XCross1', desc:'十字完成同时插入一组F2L', algo:'左逆 上顺 左顺 上逆 下逆 左逆 上顺 左顺 下顺' },
    { id:'C2F-8', name:'十字→F2L XCross2', desc:'做十字时预判F2L位置', algo:'右逆 前顺 下顺 前逆 右顺' },
    { id:'C2F-9', name:'十字→F2L 过渡7', desc:'棱块在顶需归位后配对', algo:'上逆 右顺 上顺 右逆 上逆 前逆 上顺 前顺' },
    { id:'C2F-10', name:'十字→F2L 过渡8', desc:'棱块和角块需要预配对', algo:'上顺 右顺 上双 右逆 上顺 右顺 上逆 右逆' },
  ],
};

// 渲染公式列表
function renderFormulas(category, searchTerm) {
  const list = document.getElementById('formula-list');
  if (!list) return;
  let items = FORMULAS[category] || [];
  if (searchTerm) {
    const s = searchTerm.toLowerCase();
    items = items.filter(f =>
      f.name.toLowerCase().includes(s) ||
      f.desc.toLowerCase().includes(s) ||
      f.algo.toLowerCase().includes(s)
    );
  }
  list.innerHTML = items.map(f => `
    <div class="formula-card" onclick="this.classList.toggle('expanded')">
      <div class="formula-card-header">
        <span class="formula-card-num">${f.id}</span>
        <span class="formula-card-name">${f.name}</span>
      </div>
      <div class="formula-card-desc">${f.desc}</div>
      <div class="formula-card-algo">${f.algo}</div>
    </div>
  `).join('');
  if (items.length === 0) {
    list.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:40px 0;">没有找到匹配的公式</div>';
  }
}
