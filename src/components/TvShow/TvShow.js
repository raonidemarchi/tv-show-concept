import React, { Component } from 'react'
import styles from './TvShow.module.scss'
import { removeNullItemsFromArray, getLowestNumberFromObjectArray, groupObjectArrayPropertyValues } from '../../Helpers'

import playIcon from '../../icons/play-small-player-w.svg'
import closeIcon from '../../icons/close-search-w.svg'
import addIcon from '../../icons/add-gray-s.svg'
import sadIcon from '../../icons/sad-gray-w.svg'
import recIcon from '../../icons/rec-gray-s.svg'
import shareIcon from '../../icons/share-gray-s.svg'
import telecineIcon from '../../icons/logo-telecine.svg'

class TvShow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      detailsLoaded: false,
      seasonsAndEpisodesLoaded: false,
      tvShowDetails: [],
      tvShowSeasonsAndEpisodes: [],
      selectedSeason: 0,
      selectedFooterTab: 'general',
      selectedEpisodeDetails: ''
    }
  }

  componentDidMount() {
    this.fetchDetails()
    this.fetchSeasonsAndEpisodes()
  }

  fetchDetails() {
    fetch('https://sample-api-78c77.firebaseio.com/tv-shows/SHOW123.json')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            detailsLoaded: true,
            tvShowDetails: result
          })
        },
        error => {
          this.setState({
            detailsLoaded: true,
            error
          })
        }
      )
  }

  fetchSeasonsAndEpisodes() {
    fetch('https://sample-api-78c77.firebaseio.com/episodes/SHOW123.json')
      .then(res => res.json())
      .then(
        result => {
          result = removeNullItemsFromArray(result)

          this.setState({
            seasonsAndEpisodesLoaded: true,
            tvShowSeasonsAndEpisodes: result,
            selectedSeason: getLowestNumberFromObjectArray(result, 'SeasonNumber')
          })
        },
        error => {
          this.setState({
            seasonsAndEpisodesLoaded: true,
            error
          })
        }
      )
  }

  changeSeasonTab(seasonNumber) {
    this.setState({ selectedSeason: seasonNumber })
  }

  changeFooterTab(tabName) {
    this.setState({ selectedFooterTab: tabName })
  }

  toggleEpisodeDetails(episodeId) {
    this.setState({ selectedEpisodeDetails: this.state.selectedEpisodeDetails === episodeId ? '' : episodeId })
  }

  render() {
    const { detailsLoaded, seasonsAndEpisodesLoaded, tvShowDetails, tvShowSeasonsAndEpisodes, selectedSeason, selectedFooterTab, selectedEpisodeDetails } = this.state

    return (
      <div>
        <div className={styles.content} style={{ backgroundImage: `url('${detailsLoaded && tvShowDetails.Images.Background}')` }}>
          <div className={styles.mobileBackground}>
            <img src={detailsLoaded ? tvShowDetails.Images.Background : ''} alt="Foto de capa" />
            <div className={styles.shadow}></div>
          </div>

          <div className={styles.closeIcon}>
            <img src={closeIcon} alt="Close" />
          </div>
          
          <div className={styles.contentContainer}>
            <div className={styles.flexContainer}>
              <div className={styles.titleContainer}>
                <div className={styles.title}>
                  {detailsLoaded ? tvShowDetails.Title : ''}
                </div>

                <p>80% INDICADO / CIENCIA FICCIÓN / 2015 / EUA / 14</p>
              </div>

              

              <div className={styles.episodesContainer}>
                <div className={styles.seasonsContainer}>
                  {
                    seasonsAndEpisodesLoaded && groupObjectArrayPropertyValues(tvShowSeasonsAndEpisodes, 'SeasonNumber')
                      .map(seasonNumber => <span className={seasonNumber === selectedSeason ? styles.active : ''} onClick={() => this.changeSeasonTab(seasonNumber)} key={seasonNumber}>T{seasonNumber}</span>)
                  }
                </div>

                <div className={styles.episodesList}>
                  {
                    seasonsAndEpisodesLoaded && tvShowSeasonsAndEpisodes
                      .filter(episode => episode.SeasonNumber === selectedSeason)
                      .map(episode => (
                        <div className={styles.episode} key={episode.ID}>
                          <div className={styles.episodeContainer}>
                            <div className={styles.title} onClick={() => this.toggleEpisodeDetails(episode.ID)}>
                              {episode.EpisodeNumber} {episode.Title}
                            </div>
                            
                            <div className={styles.playIconContainer}>
                              <img src={playIcon} className={styles.playIcon} alt="Assistir" />
                            </div>
                          </div>

                          <div className={[styles.episodeDetails, selectedEpisodeDetails === episode.ID ? '' : styles.hidden].join(' ')}>
                            <img src={episode.Image} alt="Imagem de descrição" />
                            {episode.Synopsis}
                          </div>
                        </div>
                      ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.sectionsContainer}>
              <div className={styles.displayFlex}>
                <span className={selectedFooterTab === 'general' ? styles.active : ''} onClick={() => this.changeFooterTab('general')}>GERAL</span>
                <span className={selectedFooterTab === 'cast' ? styles.active : ''} onClick={() => this.changeFooterTab('cast')}>ELENCO</span>
                <span>PRINCIPAIS PRÊMIOS</span>
              </div>

              <div className={styles.telecineIconContainer}>
                <img src={telecineIcon} alt="Telecine" />
              </div>
            </div>
              
            <div className={[styles.footerGeneralContainer, selectedFooterTab === 'general' ? '' : styles.displayNone].join(' ')}>
              <div className={styles.footerActionContainer}>
                <img src={addIcon} alt="Minha lista" />
                <p>Minha Lista</p>
              </div>

              <div className={styles.footerActionContainer}>
                <img src={sadIcon} alt="Avaliar" />
                <p>Avaliar</p>
              </div>

              <div className={styles.footerActionContainer}>
                <img src={recIcon} alt="Gravar" />
                <p>Gravar</p>
              </div>

              <div className={styles.footerActionContainer}>
                <img src={shareIcon} alt="Compartilhar" />
                <p>Compartilhar</p>
              </div>

              <div className={styles.synopsis}>
                <div className={styles.title}>
                  SINOPSE
                </div>

                <div>
                  {detailsLoaded && tvShowDetails.Synopsis}
                </div>
              </div>
            </div>

            <div className={[styles.footerCastContainer, selectedFooterTab === 'cast' ? '' : styles.displayNone].join(' ')}>
              {
                detailsLoaded && tvShowDetails.Cast.map(actor => (
                  <div className={styles.castBoard} key={actor.ID}>
                    {actor.Name}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TvShow
