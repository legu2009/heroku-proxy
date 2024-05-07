const list = `FBP_招新绑定率设定表 chanel_FBP_NewRecruitBinding
FBP_团队服务奖绩效乘数设定表 chanel_FBP_BTQSalesPerfFactor
FBP_个人服务奖1绩效乘数设定表 chanel_FBP_INDService1PerfFactor
FBP_个人服务奖2绩效乘数设定表 chanel_FBP_INDService2PerfFactor
FBP_超级大柜奖金设置表 chanel_FBP_SuperCounterIncentive
FBP_Eyewear奖金设定表 chanel_FBP_EyewearIncentiveSetting
FBP_CCOS折扣设定表 chanel_FBP_CCOSDiscount`;


fetch("/api/bdp/informationTable", {
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"tableId\":\"\",\"tableSqlName\":\"chaneltest_FBP_RoleTargetIncentiveAndIncentiveWeight\",\"isUsedForFormula\":\"\",\"tableName\":\"FBP_各角色目标奖金和占比设定表\",\"tableDesc\":\"\",\"tableType\":\"P00380004\",\"isWorkflow\":\"N\",\"type\":\"\",\"used\":\"\",\"storagePeriod\":\"P00440001\",\"isInfoTableHasData\":false,\"functionId\":\"\",\"tableBusiness\":\"P00760002\",\"roleList\":[\"R0001\",\"R0002\",\"R0003\",\"R0004\",\"R0005\",\"R0006\",\"R0007\",\"R0008\",\"R0009\",\"R0010\",\"R0011\",\"R0012\",\"R0013\",\"R0015\",\"R0016\",\"R0017\"],\"isRule\":\"Y\",\"isParamTable\":\"Y\",\"isIndicatorDeps\":\"N\",\"reportId\":\"\",\"tableOtherName\":\"FBP_各角色目标奖金和占比设定表\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});