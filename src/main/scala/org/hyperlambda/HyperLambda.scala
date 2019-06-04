package org.hyperlambda

import org.lamcalcj.ast.Lambda.Identifier
import org.lamcalcj.ast.Lambda.Term
import org.lamcalcj.compiler.Compiler
import org.lamcalcj.parser.Parser.ParserError
import org.lamcalcj.parser.Text
import org.lamcalcj.pretty.PrettyPrint
import org.lamcalcj.reducer.BetaReducer
import org.lamcalcj.reducer.EtaConverter
import org.lamcalcj.reducer.Result
import org.lamcalcj.reducer.Strategy

import scala.scalajs.js.annotation._

@JSExportTopLevel("HyperLambda")
object HyperLambda {
  @JSExport
  def betaReduce(input: String, maxStep: Int, maxSize: Int, maxDepth: Int, headOnly: Boolean, evaluationOnly: Boolean): String = {
    val compilerResult: Either[ParserError, (Map[String, Identifier], Term)] = Compiler.runLambdaParser(Text(input))
    if (compilerResult.isLeft)
      return compilerResult.left.get.toString
    val compiledTerm: Term = compilerResult.right.get._2

    val reducerResult: Result = BetaReducer.betaReduction(compiledTerm, Strategy(
      maxStep = Option(maxStep),
      maxSize = Option(maxSize),
      maxDepth = Option(maxDepth),
      headOnly = headOnly,
      evaluationOnly = evaluationOnly))
    val reducedTerm: Term = reducerResult.term

    val prettyPrintResult: String = PrettyPrint.printLambda(reducedTerm)
    prettyPrintResult
  }

  @JSExport
  def etaConvert(input: String, maxStep: Int, maxSize: Int, maxDepth: Int, headOnly: Boolean, evaluationOnly: Boolean): String = {
    val compilerResult: Either[ParserError, (Map[String, Identifier], Term)] = Compiler.runLambdaParser(Text(input))
    if (compilerResult.isLeft)
      return compilerResult.left.get.toString
    val compiledTerm: Term = compilerResult.right.get._2

    val reducerResult: Result = EtaConverter.etaConversion(compiledTerm, Strategy(
      maxStep = Option(maxStep),
      maxSize = Option(maxSize),
      maxDepth = Option(maxDepth),
      headOnly = headOnly,
      evaluationOnly = evaluationOnly))
    val reducedTerm: Term = reducerResult.term

    val prettyPrintResult: String = PrettyPrint.printLambda(reducedTerm)
    prettyPrintResult
  }
}
