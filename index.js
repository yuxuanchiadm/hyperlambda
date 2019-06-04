const vm = new Vue({
    el: "#index",
    data: {
        alertTitle: "",
        alertType: "info",
        showAlert: false,

        input: "",
        output: "",

        betaReduceConfig: {
            maxStep: 255,
            maxSize: 2147483647,
            maxDepth: 2147483647,
            headOnly: false,
            evaluationOnly: false
        },
        etaConvertConfig: {
            maxStep: 2147483647,
            maxSize: 2147483647,
            maxDepth: 2147483647,
            headOnly: false,
            evaluationOnly: false
        }
    },
    methods: {
        showInfo: (text, type = "info") => {
            vm.$data.showAlert = true;
            vm.$data.alertType = type;
            vm.$data.alertTitle = text
        },
        betaReduce: () => {
            vm.$data.output = HyperLambda.betaReduce(
                vm.$data.input,
                vm.$data.betaReduceConfig.maxStep,
                vm.$data.betaReduceConfig.maxSize,
                vm.$data.betaReduceConfig.maxDepth,
                vm.$data.betaReduceConfig.headOnly,
                vm.$data.betaReduceConfig.evaluationOnly)
            vm.showInfo("Completed")
        },
        etaConvert: () => {
            vm.$data.output = HyperLambda.etaConvert(
                vm.$data.input,
                vm.$data.etaConvertConfig.maxStep,
                vm.$data.etaConvertConfig.maxSize,
                vm.$data.etaConvertConfig.maxDepth,
                vm.$data.etaConvertConfig.headOnly,
                vm.$data.etaConvertConfig.evaluationOnly)
            vm.showInfo("Completed")
        }
    }
});
