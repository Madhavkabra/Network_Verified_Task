import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal';
import { Container } from '../Container';
import { Heading } from '../Heading';
import { Button } from '../Button';
import styles from './styles.module.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: '' };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.setState({ ...this.state, error });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Modal open>
          <Container>
            <Heading title='Something went wrong!' />

            <div className={styles.root}>
              <p>{this.state.error}</p>

              <div>
                <Button
                  title='Got it'
                  onClick={() =>
                    this.setState({
                      ...this.state,
                      hasError: false,
                    })
                  }
                  variant='warning'
                />
              </div>
            </div>
          </Container>
        </Modal>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};
