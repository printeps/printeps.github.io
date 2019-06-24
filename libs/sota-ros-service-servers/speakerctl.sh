#!/bin/sh
setRaspberryPiSpkVol() {
    VOLUME=`expr ${1} \* 7`
    echo $VOLUME
    amixer -c "CODEC" sset Speaker ${VOLUME}%
    amixer -c "ALSA" sset PCM ${VOLUME}%
    sudo alsactl store
}

#音量を設定する関数
setEdisonSpkVol(){
    #sotaconfに値を渡すために以下のechoは必須
    echo ${1}
    SET_VOL=$((${1} - 1))
    amixer -D "hw:CODEC" sset Speaker ${A_VOLUME[$SET_VOL]}%
}

#メイン処理
if [ "${1}" = "RaspberryPi" ] ; then
    setRaspberryPiSpkVol ${2}
elif [ ${1} = "Edison" ] ; then
    CURRENT=/home/vstone/vstonemagic/volume
    cd $CURRENT

    #音量値テーブルの読み込み(A_VOLUME[],MAX)
    . ${CURRENT}/speakerconf

    if [ ${2} -ge 1 ] && [ ${2} -le ${MAX} ] ; then
 	setEdisonSpkVol ${2}
    else
	echo '[err][speakerctl]set value is invaild' 1>&2
	exit 1
    fi
	
else
    echo '[err][speakerctl]invaild command' 1>&2
    exit 1

fi
