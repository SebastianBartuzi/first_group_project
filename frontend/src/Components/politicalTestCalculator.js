import React from "react";
import axios from 'axios';

export const calculateResults = (answers, length) => {
  //                                      1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40
  const liberalismCorrectAnswers =       [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 3, 3];
  const socialismCorrectAnswers =        [3, 5, 1, 1, 1, 1, 3, 1, 5, 1, 5, 1, 1, 5, 5, 1, 3, 5, 1, 1, 5, 5, 5, 1, 1, 1, 5, 5, 5, 1, 5, 5, 3, 1, 5, 5, 5, 5, 5, 1];
  const demSocialismCorrectAnswers =     [1, 5, 1, 1, 1, 1, 1, 1, 5, 1, 5, 1, 1, 5, 5, 1, 1, 5, 1, 1, 5, 5, 5, 1, 1, 1, 5, 5, 5, 1, 5, 5, 1, 1, 5, 5, 5, 5, 5, 1];
  const socLiberalismCorrectAnswers =    [1, 4, 2, 2, 2, 2, 1, 1, 5, 4, 5, 3, 4, 5, 5, 1, 1, 5, 1, 2, 5, 4, 5, 3, 4, 2, 5, 5, 5, 3, 3, 5, 1, 3, 4, 4, 5, 5, 4, 1];
  const libertarianismCorrectAnswers =   [1, 1, 2, 5, 3, 5, 1, 5, 5, 5, 5, 5, 5, 1, 5, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 4, 4, 1, 5, 5, 5, 2, 1, 5, 5, 1, 3, 1, 5, 5];
  const capitalismCorrectAnswers =       [3, 1, 3, 5, 3, 5, 3, 5, 3, 5, 3, 5, 5, 1, 3, 3, 3, 1, 3, 5, 3, 1, 4, 5, 5, 4, 3, 1, 4, 5, 4, 1, 3, 5, 2, 1, 3, 1, 3, 5];
  const fundamentalismCorrectAnswers =   [5, 1, 5, 5, 5, 5, 5, 5, 1, 5, 1, 5, 5, 1, 1, 3, 5, 5, 5, 5, 1, 1, 5, 5, 1, 5, 1, 1, 1, 5, 5, 1, 5, 5, 5, 1, 1, 1, 1, 5];
  const authoritarianismCorrectAnswers = [5, 3, 5, 3, 5, 3, 5, 3, 1, 3, 1, 3, 5, 3, 1, 3, 5, 2, 5, 2, 1, 3, 5, 3, 2, 3, 1, 2, 2, 4, 5, 2, 5, 5, 5, 2, 1, 2, 1, 3];
  const comunismCorrectAnswers =         [5, 5, 1, 1, 1, 1, 5, 1, 5, 1, 5, 1, 3, 5, 5, 1, 5, 5, 1, 1, 5, 5, 5, 1, 1, 1, 5, 5, 5, 1, 5, 5, 5, 1, 5, 5, 5, 5, 5, 1];
  const correctAnswers = [liberalismCorrectAnswers, socialismCorrectAnswers, demSocialismCorrectAnswers, socLiberalismCorrectAnswers, libertarianismCorrectAnswers, capitalismCorrectAnswers, fundamentalismCorrectAnswers, authoritarianismCorrectAnswers, comunismCorrectAnswers];
  var points = [length, length, length, length, length, length, length, length, length];

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < length; j++) {
      if (correctAnswers[i][j] == answers[j]) {
        points[i] = points[i] + 1;
      }
      else if (Math.abs(correctAnswers[i][j] - answers[j]) == 1) {
        points[i] = points[i] + 0.5;
      }
      else if (Math.abs(correctAnswers[i][j] - answers[j]) == 2) {
        points[i] = points[i] + 0;
      }
      else if (Math.abs(correctAnswers[i][j] - answers[j]) == 3) {
        points[i] = points[i] - 0.5;
      }
      else {
        points[i] = points[i] - 1;
      }
    }
    points[i] = Math.round(points[i] * (100 / (2 * length)));
  }
  return points;
}
