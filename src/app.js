// @flow

import * as React from "react"
import Router from "./config/router"
import { bootstrap } from "./config/bootstrap"

type Props = {}
type States = {}

bootstrap()

export default class App extends React.Component<Props, States> {
  render() {
    return <Router />
  }
}
