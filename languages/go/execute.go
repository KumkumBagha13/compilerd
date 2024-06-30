package main

import (
  "fmt"
  "os"
  "io/ioutil"
  "os/exec"
)

func main() {
  code := os.Args[1]
  ioutil.WriteFile("temp.go", []byte(code), 0644)
  cmd := exec.Command("go", "run", "temp.go")
  output, err := cmd.CombinedOutput()
  if err != nil {
    fmt.Println(err)
  }
  fmt.Println(string(output))
}
