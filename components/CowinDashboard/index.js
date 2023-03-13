import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  loading: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILED',
}

class CowinDashboard extends Component {
  state = {
    vaccinationData: {},
    responseStatus: statusConstants.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({responseStatus: statusConstants.loading})

    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachData => ({
          vaccineDate: eachData.vaccine_date,
          dose1: eachData.dose_1,
          dose2: eachData.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(eachData => ({
          age: eachData.age,
          count: eachData.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(eachData => ({
          count: eachData.count,
          gender: eachData.gender,
        })),
      }

      this.setState({
        vaccinationData: updatedData,
        responseStatus: statusConstants.success,
      })
    } else {
      this.setState({responseStatus: statusConstants.failure})
    }
  }

  renderDashboard = () => {
    const {vaccinationData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByGender,
      vaccinationByAge,
    } = vaccinationData

    return (
      <>
        <VaccinationCoverage data={last7DaysVaccination} />
        <VaccinationByGender data={vaccinationByGender} />
        <VaccinationByAge data={vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-screen-container">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  loader = () => (
    <div data-testid="loader" className="loader-wrapper">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderView = () => {
    const {responseStatus} = this.state

    switch (responseStatus) {
      case statusConstants.success:
        return this.renderDashboard()
      case statusConstants.failure:
        return this.renderFailureView()
      default:
        return this.loader()
    }
  }

  render() {
    return (
      <div className="bg-container">
        <div className="responsive-wrapper">
          <div className="header-section">
            <img
              className="header-logo-img"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1 className="logo-heading">Co-WIN</h1>
          </div>
          <h1 className="dashboard-heading">CoWIN Vaccination in India</h1>
          {this.renderView()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
