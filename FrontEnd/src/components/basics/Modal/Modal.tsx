import React, { FunctionComponent, ReactElement } from 'react';
import {
  default as MaterialUIModal,
  ModalProps as MaterialUIModalProps,
} from '@material-ui/core/Modal';
import cn from 'classnames';
import styles from './Modal.module.scss';
import { Subtitle1, Button } from '@basics';
import { miscIcons } from '@icons';

export type ImageTypeName = { src: string; alt?: string };

interface ModalProps
  extends Omit<MaterialUIModalProps, 'disableBackdropClick' | 'children'> {
  children?: (ReactElement | undefined | false)[];
  size?: 'md' | 'lg';
  title?: string;
  caption?: string;
  modalGraphic?: string | ImageTypeName;
}

/**
 * Modal component. Used for popups. size is 'md' (medium) by default
 *
 * Can optionally provide a a modalGraphic, a visual/image for the popup,
 * a title, displayed under modal graphic (if provided), and a caption,
 * brief explanation of modal.
 *
 * children can be additional buttons/components unique to specific modal
 *
 * onClose needs to be provied in order to close the popup (with either
 * the exit button or esc)
 *
 */
const Modal: FunctionComponent<ModalProps> = ({
  title,
  caption,
  modalGraphic,
  children,
  onClose,
  open,
  className,
  size = 'md',
  // default keepMounted is true (necessary for SSR/nextjs, so that it will be sent to client)
  keepMounted = true,
  ...passedProps
}) => {
  return (
    <MaterialUIModal
      onClose={onClose}
      open={open}
      keepMounted={keepMounted}
      {...passedProps}
      className={styles.materialUIModal}
      disableBackdropClick
    >
      <div className={cn(styles.modal, styles[size], className)}>
        <div>
          <Button variant="wrapper" className={styles.close} onClick={onClose}>
            <miscIcons.orangeX />
          </Button>
        </div>

        {modalGraphic && (
          <div className={styles.modalGraphic}>
            {typeof modalGraphic === 'string' ? (
              <img src={modalGraphic} />
            ) : (
              <img src={modalGraphic.src} alt={modalGraphic.alt} />
            )}
          </div>
        )}

        {title && (
          <div className={cn(styles.text, styles.title)}>
            <h4>{title}</h4>
          </div>
        )}

        {caption && (
          <Subtitle1 className={cn(styles.text, styles.caption)}>
            {caption}
          </Subtitle1>
        )}

        {children}
      </div>
    </MaterialUIModal>
  );
};

export default Modal;
