#!/usr/bin/env bash
. constant.sh

cd ${imageDir}

convert A.png B.png C.png D.png E.png F.png G.png H.png I.png J.png K.png L.png M.png +append 1.png
convert N.png O.png P.png Q.png R.png S.png T.png U.png V.png W.png X.png Y.png Z.png +append 2.png
convert 1.png 2.png -append ${1}
rm 1.png 2.png
rm A.png B.png C.png D.png E.png F.png G.png H.png I.png J.png K.png L.png M.png
rm N.png O.png P.png Q.png R.png S.png T.png U.png V.png W.png X.png Y.png Z.png