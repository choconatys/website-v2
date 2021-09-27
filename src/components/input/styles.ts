import { TextField } from "@mui/material";

import styled from "styled-components";

export const Container = styled(TextField)`
    width: 100%;

    background: var(--white);

    & + & {
        margin-top: 1.2rem;
    }
`;
