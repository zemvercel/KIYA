import React, { useState } from "react";
import {
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Modal,
  Platform,
} from "react-native";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";
import { Colors } from "@/constants/Colors";

type Recording = {
  sound: Audio.Sound;
  duration: string;
  uri: string | null;
};

const VoiceRecorder: React.FC = () => {
  const [recording, setRecording] = useState<Audio.Recording | undefined>();
  const [lastRecording, setLastRecording] = useState<Recording | null>(null);
  const [transcription, setTranscription] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  async function startRecording() {
    if (recording) {
      setModalMessage("Recording already in progress!");
      setModalVisible(true);
      return;
    }

    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status !== "granted") {
        setModalMessage("Permission to access microphone is required!");
        setModalVisible(true);
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });

      const recording = new Audio.Recording();
      const recordingOptions = {
        android: {
          extension: ".wav",
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
          sampleRate: 44100,
          bitRate: 128000,
          numberOfChannels: 1,
        },
        ios: {
          extension: ".wav",
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          sampleRate: 44100,
          bitRate: 128000,
          numberOfChannels: 1,
        },
      };
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
      setRecording(recording);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setModalMessage(`Failed to start recording: ${errorMessage}`);
      setModalVisible(true);
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      const newRecording: Recording = {
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        uri: recording.getURI(),
      };
      setLastRecording(newRecording);
      setRecording(undefined);
      if (newRecording.uri) {
        await sendRecordingToBackend(newRecording);
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  }

  function getDurationFormatted(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.round((milliseconds / 1000) % 60);
    return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  }

  async function sendRecordingToBackend(recording: Recording) {
    if (!recording || !recording.uri) return;

    const formData = new FormData();
    formData.append("audio_data", {
      uri: recording.uri,
      name: "recording.wav",
      type: "audio/wav",
    } as any);

    try {
      const response = await fetch("http://192.168.1.5:5000/transcribe", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTranscription(data.amh || "No transcription available");
      console.log("File uploaded successfully", data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Failed to upload file", errorMessage);
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary }}>
      <View style={styles.container}>
        <View style={{ marginBottom: -40 }}>
          <Header />
        </View>
        <Text
          style={{
            color: Colors.white,
            textAlign: "center",
            fontSize: 25,
            marginTop: 40,
          }}
        >
          {recording
            ? "Recording in progress"
            : "Long Press the button to start"}
        </Text>
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <Image
            style={{
              height: 300,
              width: 300,
            }}
            source={require("../assets/voice.png")}
          />
        </View>

        <Text
          style={{
            color: Colors.white,
            marginTop: 40,
            fontSize: 30,
            paddingHorizontal: 30,
          }}
        >
          {transcription}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginHorizontal: 30,
            marginTop: 40,
          }}
        >
          <View style={styles.first}>
            <Image
              style={{ height: 30, width: 30 }}
              source={require("../assets/lock.png")}
            />
          </View>
          <TouchableOpacity
            onPressIn={startRecording}
            onPressOut={stopRecording}
          >
            <View style={styles.middle}>
              <Image
                style={{ height: 40, width: 40 }}
                source={
                  recording
                    ? require("../assets/cancel.png")
                    : require("../assets/mic.png")
                }
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLastRecording(null)}>
            <View style={styles.last}>
              <Image
                style={{ height: 30, width: 30 }}
                source={require("../assets/cancel.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default VoiceRecorder;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  first: {
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  middle: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  last: {
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: Colors.primary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
});
