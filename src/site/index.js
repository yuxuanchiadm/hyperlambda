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
        loadExample: () => {
            vm.$data.input =
                "(λfix. λif. λisZero. λ0. λplus. λpred. λ5." + "\n" +
                "  (fix (λself. λx. if" + "\n" +
                "    (isZero x)" + "\n" +
                "    0" + "\n" +
                "    (plus x (self (pred x)))" + "\n" +
                "  )) 5" + "\n" +
                ")" + "\n" +
                "(λf.(λx.f (x x)) (λx.f (x x)))" + "\n" +
                "(λb.λt.λf.b t f)" + "\n" +
                "(λn.n (λx.λt.λf.f) (λt.λf.t))" + "\n" +
                "(λf.λx.x)" + "\n" +
                "(λm.λn.λf.λx.m f (n f x))" + "\n" +
                "(λn.λf.λx.n (λg.λh.h (g f)) (λu.x) (λu.u))" + "\n" +
                "(λf.λx.f (f (f (f (f x)))))"
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
