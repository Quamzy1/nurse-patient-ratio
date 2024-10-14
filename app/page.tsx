"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { AlertCircle, UserPlus, Users, UserCog, Copy, Check } from "lucide-react"

export default function RatioCalculator() {
  const [professionalNurses, setProfessionalNurses] = useState("1")
  const [auxiliaryNurses, setAuxiliaryNurses] = useState("2")
  const [patients, setPatients] = useState("30")
  const [professionalRatio, setProfessionalRatio] = useState<string>("1:30")
  const [auxiliaryRatio, setAuxiliaryRatio] = useState<string>("1:15")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const calculateRatios = () => {
    const profNurseCount = parseInt(professionalNurses)
    const auxNurseCount = parseInt(auxiliaryNurses)
    const patientCount = parseInt(patients)

    if (isNaN(profNurseCount) || isNaN(auxNurseCount) || isNaN(patientCount)) {
      setError("Please enter valid numbers for all fields.")
      setProfessionalRatio("")
      setAuxiliaryRatio("")
      return
    } 

    if (profNurseCount < 0 || auxNurseCount < 0 || patientCount <= 0) {
      setError("All numbers must be non-negative and patients must be greater than zero.")
      setProfessionalRatio("")
      setAuxiliaryRatio("")
      return
    }

    setError("")

    if (profNurseCount > 0) {
      const profRatio = patientCount / profNurseCount
      setProfessionalRatio(`1:${Math.round(profRatio)}`)
    } else {
      setProfessionalRatio("N/A")
    }

    if (auxNurseCount > 0) {
      const auxRatio = patientCount / auxNurseCount
      setAuxiliaryRatio(`1:${Math.round(auxRatio)}`)
    } else {
      setAuxiliaryRatio("N/A")
    }
  }

  const copyResults = () => {
    const results = `Professional Nurse-Patient Ratio: ${professionalRatio}\nAuxiliary Nurse-Patient Ratio: ${auxiliaryRatio}`
    navigator.clipboard.writeText(results).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  useEffect(() => {
    calculateRatios()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md bg-slate-800 text-slate-100 shadow-lg border border-slate-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-slate-100">
            Nurse Patient Ratio Calculator
          </CardTitle>
          <p className="text-slate-400 text-center text-sm">Calculate separate ratios for nurse types</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="professionalNurses" className="text-slate-200 flex items-center gap-2">
                <UserCog className="h-4 w-4" />
                Number of Professional Nurses
              </Label>
              <Input
                id="professionalNurses"
                type="number"
                placeholder="Enter number of professional nurses"
                value={professionalNurses}
                onChange={(e) => setProfessionalNurses(e.target.value)}
                min="0"
                className="bg-slate-700 text-slate-100 border-slate-600 focus:border-slate-500 focus:ring-slate-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auxiliaryNurses" className="text-slate-200 flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Number of Auxiliary Nurses
              </Label>
              <Input
                id="auxiliaryNurses"
                type="number"
                placeholder="Enter number of auxiliary nurses"
                value={auxiliaryNurses}
                onChange={(e) => setAuxiliaryNurses(e.target.value)}
                min="0"
                className="bg-slate-700 text-slate-100 border-slate-600 focus:border-slate-500 focus:ring-slate-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patients" className="text-slate-200 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Number of Patients
              </Label>
              <Input
                id="patients"
                type="number"
                placeholder="Enter number of patients"
                value={patients}
                onChange={(e) => setPatients(e.target.value)}
                min="1"
                className="bg-slate-700 text-slate-100 border-slate-600 focus:border-slate-500 focus:ring-slate-500"
              />
            </div>
            <Button onClick={calculateRatios} className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
              Calculate Ratios
            </Button>
            {error && (
              <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-3 rounded-md" role="alert">
                <AlertCircle className="h-5 w-4" />
                <span>{error}</span>
              </div>
            )}
            {(professionalRatio || auxiliaryRatio) && (
              <div className="text-center p-6 bg-gradient-to-r from-slate-700 to-slate-600 rounded-md shadow-inner">
                <div className="mb-4">
                  <p className="text-sm text-slate-300 mb-1">Professional Nurse-Patient Ratio:</p>
                  <p className="text-3xl font-bold text-slate-100">
                    {professionalRatio}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-300 mb-1">Auxiliary Nurse-Patient Ratio:</p>
                  <p className="text-3xl font-bold text-slate-100">
                    {auxiliaryRatio}
                  </p>
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  Ratios are calculated separately for each nurse type
                </p>
                <Button
                  onClick={copyResults}
                  className="mt-4 bg-slate-600 hover:bg-slate-500 text-white transition-colors"
                >
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {copied ? "Copied!" : "Copy Results"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="text-center text-xs text-slate-400">
          by Quamzy
        </CardFooter>
      </Card>
    </div>
  )
}