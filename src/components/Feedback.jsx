import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { resetScore } from '../actions';
import { addRanking } from '../services/localStorage';

class Feedback extends React.Component {
  saveRanking = () => {
    const { name, score, gravatarEmail, dispatch } = this.props;
    const avatar = md5(gravatarEmail).toString();
    const gravatar = `https://www.gravatar.com/avatar/${avatar}`;
    const user = {
      name,
      score,
      gravatar,
    };
    addRanking(user);
    const newScore = 0;
    dispatch(resetScore(newScore));
  }

  btnRanking = () => {
    const { history } = this.props;
    this.saveRanking();
    history.push('/ranking');
  }

  btnPlayAgain = () => {
    const { history } = this.props;
    this.saveRanking();
    history.push('/');
  }

  render() {
    const { score, assertions } = this.props;
    const MIN_ASSERT = 3;
    return (
      <section>
        <section>
          <p data-testid="feedback-text">
            { assertions < MIN_ASSERT ? 'Could be better...' : 'Well Done!'}
          </p>
          <section>
            <span> Pontuação</span>
            <span data-testid="feedback-total-score">
              {score}
            </span>
          </section>
          <section>
            <span> Quantidade de Acertos</span>
            <span data-testid="feedback-total-question">
              { assertions }
            </span>
          </section>
          <section>
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ this.btnPlayAgain }
            >
              Play Again
            </button>
          </section>
          <section>
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ this.btnRanking }
            >
              Ranking
            </button>
          </section>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
