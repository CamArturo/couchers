import { Typography, useMediaQuery, useTheme } from "@material-ui/core";
import Alert from "components/Alert";
import Button from "components/Button";
import RatingsSlider from "components/RatingsSlider";
import TextBody from "components/TextBody";
import {
  NEXT,
  PRIVATE_ANSWER,
  QUESTION_MARK,
  RATING_EXPLANATION,
  RATING_QUESTION,
  REFERENCE_FORM_HEADING,
} from "features/communities/constants";
import { useData } from "features/communities/leaveReference/ReferenceDataContext";
import {
  ReferenceFormProps,
  useReferenceStyles,
} from "features/communities/leaveReference/ReferenceForm";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { leaveReferenceBaseRoute } from "routes";

export default function Rating({ user }: ReferenceFormProps) {
  const history = useHistory();
  const classes = useReferenceStyles();
  const theme = useTheme();
  const isMdOrWider = useMediaQuery(theme.breakpoints.up("md"));
  const { referenceType, hostRequest } = useParams<{
    referenceType: string;
    hostRequest?: string;
  }>();
  const { data, setValues } = useData()!;
  const { control, handleSubmit, errors } = useForm<typeof data>({
    defaultValues: {
      rating: data.rating,
    },
  });

  const onSubmit = (values: typeof data) => {
    setValues(values);
    hostRequest
      ? history.push(
          `${leaveReferenceBaseRoute}/${referenceType}/${user.userId}/${hostRequest}/reference`
        )
      : history.push(
          `${leaveReferenceBaseRoute}/${referenceType}/${user.userId}/reference`
        );
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h1">
        {REFERENCE_FORM_HEADING}
        {user.name}
      </Typography>
      <TextBody className={classes.text}>{RATING_EXPLANATION}</TextBody>
      <TextBody className={classes.text}>{PRIVATE_ANSWER}</TextBody>
      {errors && errors.rating?.message && (
        <Alert className={classes.alert} severity="error">
          {errors.rating.message}
        </Alert>
      )}
      <Typography variant="h3" className={classes.text}>
        {RATING_QUESTION}
        {user.name}
        {QUESTION_MARK}
      </Typography>
      <Controller
        render={({ onChange }) => (
          <RatingsSlider onChange={onChange} defaultValue={data.rating} />
        )}
        name="rating"
        control={control}
      />
      <div className={classes.buttonContainer}>
        <Button fullWidth={!isMdOrWider} type="submit">
          {NEXT}
        </Button>
      </div>
    </form>
  );
}
