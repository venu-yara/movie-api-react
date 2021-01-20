import styled, { css } from "styled-components";
import Button from "@material-ui/core/Button";

export const TabButton = styled(Button)`
  text-transform: none;
  border-radius: unset;
  padding: 10px 20px;
  width: 110px;
  > span {
    display: flex;
    flex-direction: column;
  }
  ${(p) =>
    p.active &&
    css`
      color: #0000ff;
      border-bottom: 2px solid #0000ff;
    `}
`;
