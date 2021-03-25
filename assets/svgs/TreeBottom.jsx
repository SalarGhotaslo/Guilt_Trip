import * as React from "react";
import Svg, { G, Path, Text, TSpan } from "react-native-svg";
import { Dimensions, Modal, View, Button } from "react-native";
import * as Font from "expo-font";
const windowWidth = Dimensions.get("window").width;

const TreeBottom = (props) => {
  async () => {
    await Font.loadAsync({
      Caveman: require("../fonts/Caveman.otf"),
    });
  };
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={windowWidth}
      height={windowWidth * (78 / 90)}
      viewBox="0 0 90 78"
      {...props}
    >
      <G fill="#bd116f">
        <Path d="M.026 19.305a361.655 361.655 0 0120.32-2.895c6.193-.704 12.411-1.248 18.643-1.338 4.47-.064 8.94.105 13.4.401 8.59.57 17.176 1.618 25.518 3.746a100.419 100.419 0 0112.001 3.88" />
        <Path d="M.026 19.305L0 78h90l-.092-54.902" />
      </G>
      <Path
        d="M86.95 22.062c-6.517-2.538-17.882-5.02-27.458-5.997-16.234-1.656-30.057-1.158-49.767 1.795-3.566.534-7.213 1.078-8.104 1.208L0 19.305V0h90v11.559c0 6.357-.129 11.538-.286 11.513-.157-.024-1.401-.479-2.765-1.01z"
        fill="#0ff"
      />
      <Path
        d="M49.5 0l.094 3.978.756 6.426 1.842 3.307.567 5.055.848 2.741 1.036 1.738.902 1.085 1.236 1.287 1.052.5 1.37.585 1.553-.1.785.602-2.79 1.135-1.118-.367-1.554-.134-1.403.134.752.919 2.088 2.004 1.186 1.955-1.871-.618-.718-.802-1.37-.134-1.921-.3-1.604-.1-.484.367-.501.133-.268.418-.167.701 1.67 2.306 1.504 2.522-2.155-.785-1.27-.819-1.453-.851-.735-1.086-.434-.368-.785-.167-1.637.134-.568.334-1.386 1.887-1.02 1.788-.534.417-1.002.05-2.389.802-2.222.769.017-.25 1.053-1.588.885-.818 1.27-.802.467-.919.451-.618-1.37-.434-1.653-.418-.401.318-1.17.183-1.57.034-.468.234-1.653.484-1.454.067.619-.652 1.252-1.135.284.033 1.47-.668.451-.451.217-.568.468-.284.618-.284.635-1.036-.384-.017-.902.05-.518.134-1.12.501-1.169.05s-.84-.268-.776-.394c.063-.126-.284-.095.19-.378.472-.283.85-.378 1.417-.85.567-.473 1.26-.82 1.7-1.418.442-.598.977-1.26 1.323-1.795.347-.535.85-.441 1.04-1.607.189-1.165.818-1.449 1.134-3.023.315-1.575-.327-3.326.567-5.765.819-2.236 1.582-3.824 1.748-6.614.166-2.79.284-5.96.45-8.75z"
        fill="purple"
      />
      <G>
        <Path
          style={{
            fontVariationSettings: "normal",
          }}
          fill="#a47e57"
          fillRule="evenodd"
          d="M29.266 38.186h5.479v25.19h-5.479z"
        />
        <Path
          style={{
            fontVariationSettings: "normal",
          }}
          fill="#c49567"
          fillRule="evenodd"
          d="M10.173 35.079h43.553v5.212H10.173z"
        />
        <Path
          style={{
            fontVariationSettings: "normal",
          }}
          fill="#b4895f"
          fillRule="evenodd"
          d="M10.623 30.163h43.798v4.916H10.623z"
        />
        <Path
          style={{
            fontVariationSettings: "normal",
          }}
          fill="#c49567"
          fillRule="evenodd"
          d="M10.173 24.946h43.055v5.217H10.173z"
        />
        <Path
          style={{
            fontVariationSettings: "normal",
          }}
          fill="#b4895f"
          fillRule="evenodd"
          d="M10.995 19.82h43.047v5.126H10.995z"
        />
        <Text
          xmlSpace="preserve"
          style={{
            lineHeight: 1.25,
          }}
          x={18.108}
          y={24.392}
          transform="scale(1.0105 .98962)"
          fontStyle="normal"
          fontWeight={400}
          fontSize={4.23}
          fill="#000"
          stroke="none"
          strokeWidth={0.106}
        >
          {`Steps : ${props.count}`}
        </Text>
        <Text
          xmlSpace="preserve"
          style={{
            lineHeight: 1.25,
          }}
          x={15.413}
          y={29.368}
          transform="scale(1.0105 .98962)"
          fontStyle="normal"
          fontWeight={400}
          fontSize={4.23}
          fill="#000"
          stroke="none"
          strokeWidth={0.106}
        >
          {`Target : ${props.target}`}
        </Text>
        <Text
          xmlSpace="preserve"
          style={{
            lineHeight: 1.25,
          }}
          x={11.397}
          y={34.229}
          transform="scale(1.0105 .98962)"
          fontStyle="normal"
          fontWeight={400}
          fontSize={4.23}
          fill="#000"
          stroke="none"
          strokeWidth={0.106}
        >
          {`Remaining : ${props.remaining <= 0 ? 0 : props.remaining}`}
        </Text>
        <Text
          xmlSpace="preserve"
          style={{
            lineHeight: 1.25,
          }}
          x={19.909}
          y={38.955}
          transform="scale(1.0105 .98962)"
          fontStyle="normal"
          fontWeight={400}
          fontSize={4.23}
          fill="#000"
          stroke="none"
          strokeWidth={0.106}
        >
          {`Sloths : ${props.slothPopulation}`}
        </Text>
      </G>
    </Svg>
  );
};

export default TreeBottom;
